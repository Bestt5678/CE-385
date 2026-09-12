//ข้อมูลนักศึกษาจาก Workshop 2
const studentList = [
  { id: '01', name: 'หนึ่ง', major: 'CE', score: 85 },
  { id: '02', name: 'สอง',  major: 'CE', score: 72 },
  { id: '03', name: 'สาม', major: 'IT', score: 45 },
  { id: '04', name: 'สี่',  major: 'IT', score: 91 }
];

const toGrade = (score) => (score >= 50 ? 'P' : 'F');
//ฟังก์ชันจากข้อ 2 หน่วงเวลา 300ms และคืนค่า Promise
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== 'string' || id.trim() === '') {
      return reject(new Error('รหัสนักศึกษาไม่ถูกต้อง'));
    }
    setTimeout(() => {
      const foundStudent = studentList.find((student) => student.id === id);
      return foundStudent ? resolve({ ...foundStudent }) : reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }, 300);
  });
}

// ส่วนที่ 1 — reportSequential(): ดึงข้อมูลทีละคนตามลำดับ
async function reportSequential() {
  const startTime = Date.now();
  const targetIds = ['01', '02', '03'];

  // ใช้ for of กับ await เพื่อรอทีละข้อ
  for (const id of targetIds) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`[Sequential] ดึงสำเร็จ: ${student.name}`);
  }

  const timeUsed = Date.now() - startTime;
  console.log(`reportSequential ใช้เวลาทั้งหมด: ${timeUsed} ms`);
  return timeUsed;
}

// ส่วนที่ 2 — reportParallel(): ดึงข้อมูลพร้อมกันแบบขนาน
async function reportParallel(sequentialTime) {
  const startTime = Date.now();
  const targetIds = ['01', '02', '03'];

  // ใช้ Promise.all + map ดึงข้อมูลพร้อมกัน
  const students = await Promise.all(targetIds.map((id) => fetchStudentByIdAsync(id)));
  students.forEach((student) => console.log(`[Parallel] ดึงสำเร็จ: ${student.name}`));

  const timeUsed = Date.now() - startTime;
  const speedUp = (sequentialTime / timeUsed).toFixed(2);
  console.log(`reportParallel ใช้เวลาทั้งหมด: ${timeUsed} ms (เร็วกว่าแบบลำดับ ${speedUp} เท่า)`);
}

// ส่วนที่ 3 — safeReport(id): จัดการ error ด้วย try-catch-finally
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// ฟังก์ชันหลักรันการทดสอบทั้งหมด
async function main() {
  console.log('--- เริ่มการทดสอบ ข้อที่ 3 ---');
  
  // รันแบบลำดับและเก็บเวลา
  const seqTime = await reportSequential();
  
  // รันแบบขนานและเปรียบเทียบเวลา
  await reportParallel(seqTime);

  console.log('\n--- ทดสอบ safeReport ---');
  await safeReport('01'); // กรณีพบ
  await safeReport('9999'); // กรณีไม่พบ
}

main();

// ส่วนที่ 4 — ตอบคำถามท้ายไฟล์เป็น comment
/*
  คำตอบข้อ 3:
  1) ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
     ตอบ: เพราะ await จะหยุดรอผลลัพธ์และทำการแปลง Promise Rejection ให้กลายเป็น JavaScript Exception 
          ทำให้บล็อก try-catch สามารถดักจับได้ตามปกติ ต่างจาก callback ธรรมดาที่ทำงานใน Event Loop รอบอื่น 
          นอกขอบเขต (Scope) ของ try-catch ไปแล้ว

  2) ทดลองลืม await หน้า Promise.all แล้วเอาผลไปใช้ต่อ เกิดอะไรขึ้น?
     ตอบ: ตัวแปรจะเก็บค่าเป็น Promise object ที่สถานะยังเป็น <pending> แทนที่จะเป็น Array ของข้อมูลนักศึกษา 
          ทำให้เมื่อนำไปวนลูปอ่านค่าต่อ จะเกิดข้อผิดพลาดหรือได้ค่าที่ไม่ถูกต้องทันที
*/