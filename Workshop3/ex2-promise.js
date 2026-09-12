//ข้อมูลนักศึกษาจาก Workshop 2
const studentList = [
  { id: '01', name: 'หนึ่ง', major: 'CE', score: 85 },
  { id: '02', name: 'สอง',  major: 'CE', score: 72 },
  { id: '03', name: 'สาม', major: 'IT', score: 45 },
  { id: '04', name: 'สี่',  major: 'IT', score: 91 }
];
//คะแนนเป็นเกรด
const toGrade = (score) => {
  if (score >= 80) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'D+';
  if (score >= 50) return 'D';
  return 'F';
};

//แปลงฟังก์ชันให้คืนค่าเป็น Promise (ห้ามใช้ async ตามโจทย์)
function fetchStudentByIdAsync(id) {
//ห่อฟังก์ชันด้วย new Promise
  return new Promise((resolve, reject) => {
//ตรวจสอบความถูกต้องของ id
    if (typeof id !== 'string' || id.trim() === '') {
//หากผิดพลาด เรียก reject พร้อมแนบ Error
      return reject(new Error('รหัสนักศึกษาไม่ถูกต้อง'));
    }

//หน่วงเวลา 300ms
    setTimeout(() => {
      const foundStudent = studentList.find((student) => student.id === id);
//ถ้าไม่พบข้อมูลให้ reject
      if (!foundStudent) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }

//ถ้าพบข้อมูลให้ resolve พร้อมส่งสำเนา object
      return resolve({ ...foundStudent });
    }, 300);
  });
}

//เรียกใช้ 3 กรณีด้วย 
console.log('--- เริ่มการทดสอบ ข้อที่ 2 (ส่วนที่ 2) ---');

const testIds = ['01', '9999', 42];
//วนลูป array เพื่อทดสอบทีละ id
testIds.forEach((id) => {
  fetchStudentByIdAsync(id)
    .then((student) => {
//.then จะทำงานเมื่อ Promise ถูก resolve (สำเร็จ)
      console.log(`[ID: ${id}] สำเร็จ:`, student);
    })
//.catch จะทำงานเมื่อ Promise ถูก reject (ล้มเหลว) ป้องกันโปรแกรมพัง
    .catch((error) => {
      console.error(`[ID: ${id}] ผิดพลาด:`, error.message);
    })
//.finally จะทำงานเสมอไม่ว่าจะสำเร็จหรือล้มเหลว มักใช้ปิดระบบโหลดดิ้ง
    .finally(() => {
      console.log(`[ID: ${id}] การทำงานเสร็จสิ้น`);
    });
});

//โซ่ Promise Chain 3 ขั้น
console.log('--- เริ่มการทดสอบ ข้อที่ 2 (Promise Chain) ---');

fetchStudentByIdAsync('01')
//แปลงเป็น  name, grade 
  .then((student) => {
    return {
      name: student.name,
      grade: toGrade(student.score)
    };
  })
//รับ Object จากขั้นที่แล้ว มาสร้าง String รายงานผล
  .then((summary) => {
    return `นักศึกษาชื่อ ${summary.name} ได้เกรด ${summary.grade}`;
  })
//รับ String จากขั้นที่แล้ว มาพิมพ์ออกทาง console
  .then((reportMessage) => {
    console.log('รายงานผลการเรียน:', reportMessage);
  })
//ถ้าข้อไหน error ให้โดดมาบล็อคนี้
  .catch((error) => {
    console.error('เกิดข้อผิดพลาดใน Chain:', error.message);
  });

//ฟังก์ชัน promisify เปลี่ยน callback เป็น promise
function promisify(fn) {
//คืนค่าฟังก์ชันใหม่ที่สามารถรับ arguments ได้ไม่จำกัด (...args)
  return function (...args) {
//ฟังก์ชันใหม่นี้จะคืนค่า Promise
    return new Promise((resolve, reject) => {
//เรียกฟังก์ชัน error-first callback เดิม
      fn(...args, (err, result) => {
//ถ้า callback มี error ให้ reject
        if (err) {
          return reject(err);
        }
//ถ้าสำเร็จ ให้ resolve ด้วยผลลัพธ์
        return resolve(result);
      });
    });
  };
}

