import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../errors/app-error.js";

interface ErrorBody {
  error: { code: string; message: string; details?: unknown };
}

export const notFoundHandler: RequestHandler = (req, res) => {
  const body: ErrorBody = {
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `ไม่มีเส้นทาง ${req.method} ${req.originalUrl} ในระบบนี้`,
    },
  };
  res.status(404).json(body);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const status = (err as ZodError & { httpStatus?: number }).httpStatus ?? 422;
    const body: ErrorBody = {
      error: {
        code: "VALIDATION_ERROR",
        message: "ข้อมูลที่ส่งมาไม่ถูกต้อง",
        details: err.issues.map((issue) => ({
          field: issue.path.join(".") || "(ทั้งก้อน)",
          message: issue.message,
        })),
      },
    };
    res.status(status).json(body);
    return;
  }

  if (err instanceof AppError) {
    const body: ErrorBody = { error: { code: err.code, message: err.message } };
    res.status(err.statusCode).json(body);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const map: Record<string, { status: number; code: string; message: string }> = {
      P2002: { status: 409, code: "DUPLICATE",      message: "ข้อมูลนี้มีอยู่แล้วในระบบ" },

      P2025: { status: 404, code: "NOT_FOUND",      message: "ไม่พบข้อมูลที่ต้องการแก้ไขหรือลบ" },

      P1001: { status: 503, code: "DB_UNAVAILABLE", message: "ติดต่อฐานข้อมูลไม่ได้" },
    };

    const hit = map[err.code];
    if (hit) {
      const target = (err.meta as { target?: string[] } | undefined)?.target;
      const body: ErrorBody = {
        error: {
          code: hit.code,
          message: hit.message,
          details: target ? { field: target.join(", ") } : undefined,
        },
      };
      res.status(hit.status).json(body);
      return;
    }
  }

  console.error("[UNHANDLED]", err);
  const body: ErrorBody = {
    error: { code: "INTERNAL_ERROR", message: "เกิดข้อผิดพลาดภายในระบบ" },
  };
  res.status(500).json(body);
};
