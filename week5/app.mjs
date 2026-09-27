import express from 'express';

const app = express();
const PORT = 3000; 

//สร้าง Array ข้อมูล4 ตัว
let TODOS = [
    { id: 1, title: "อันที่ 1", done: false, priority: "high" },
    { id: 2, title: "อันที่ 2", done: true, priority: "medium" },
    { id: 3, title: "อันที่ 3", done: false, priority: "low" },
    { id: 4, title: "อันที่ 4", done: false, priority: "high" }
];

//Built-in Middleware สำหรับอ่านข้อมูล Body แบบ JSON
app.use(express.json());

//สร้าง Middleware function validateTodo 
function validateTodo(req, res, next) {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
    }
    next();
}

//สร้าง Group Router ชื่อ todoRouter
const todoRouter = express.Router();

//Method get : /health 
todoRouter.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// Method get : 
todoRouter.get('/', (req, res) => {
    res.status(200).json(TODOS);
});

// Method get : id
todoRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = TODOS.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: "ไม่พบข้อมูล Todo นี้" });
    }
    res.status(200).json(todo);
});

// Method post | middleware validateTodo เพิ่มข้อมูลไปยัง array TODOS
todoRouter.post('/', validateTodo, (req, res) => {
    const newTodo = {
        id: TODOS.length > 0 ? Math.max(...TODOS.map(t => t.id)) + 1 : 1,
        title: req.body.title,
        done: req.body.done || false,
        priority: req.body.priority || "medium"
    };
    TODOS.push(newTodo);
    res.status(201).json(newTodo);
});

//mount Router ที่ "/api/v1/todos"
app.use("/api/v1/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});