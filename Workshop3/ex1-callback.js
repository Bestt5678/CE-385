//สร้างข้อมูลนักศึกษา 4 คน
const studentList = [
  { id: '01', name: 'หนึ่ง', major: 'CE', score: 85 },
  { id: '02', name: 'สอง',  major: 'CE', score: 72 },
  { id: '03', name: 'สาม', major: 'IT', score: 45 },
  { id: '04', name: 'สี่',  major: 'IT', score: 91 }
];

//ฟังก์ชันดึงข้อมูลตามธรรมเนียม error-first callback
function fetchStudentById(id, callback) {
//idต้องเป็น string และ ต้องไม่มีค่าว่าง
  if (typeof id !== 'string' || id.trim() === '') {
//ส่ง error กลับผ่าน callback และต้องใส่ return เพื่อหยุดฟังก์ชัน
    return callback(new Error('รหัสนักศึกษาไม่ถูกต้อง'));
  }

//จำลองดึงข้อมูลโดยใช้ setTimeout หน่วงเวลา 300ms
  setTimeout(() => {
//ค้นหานักศึกษาจาก array ด้วย id
    const foundStudent = studentList.find((student) => student.id === id);

//ถ้าหาไม่เจอ
    if (!foundStudent) {
//ส่ง error ว่าไม่พบรหัสนักศึกษา
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

//ถ้าค้นหาพบ ให้ส่ง null ในตำแหน่ง error และส่งสำเนา object ({ ...student }) เสมอ
    return callback(null, { ...foundStudent });
  }, 300);
}

//เรียกใช้ครบ 3 กรณี
console.log('--- เริ่มการทดสอบ ข้อที่ 1 ---');

//กรณี ก id ที่มีจริง
fetchStudentById('01', (error, student) => {
//ตรวจสอบ error ก่อนแตะผลลัพธ์เสมอ
  if (error) {
    return console.error('เคส ก ล้มเหลว:', error.message);
  }
  return console.log('เคส ก พบข้อมูล:', student);
});

//กรณี ข id ที่ไม่มีอยู่จริง
fetchStudentById('9999', (error, student) => {
  if (error) {
    return console.error('เคส ข ล้มเหลว:', error.message);
  }
  return console.log('เคส ข พบข้อมูล:', student);
});

//กรณี ค id ผิดรูปแบบ 
fetchStudentById(42, (error, student) => {
  if (error) {
    return console.error('เคส ค ล้มเหลว:', error.message);
  }
  return console.log('เคส ค พบข้อมูล:', student);
});

//คำถามท้ายcomment
/*
  คำตอบข้อ 1:
  1 หากเกิด error ตัวแปร student จะเป็น undefined การสั่ง undefined.name จะทำให้ Error 
ทำให้โปรแกรม Crash หยุดทำงาน ผู้ใช้จะเห็นโปรแกรมพัง และคนเขียนจะเห็น Stack Trace ใน Terminal

  2 ที่ต้องเรียก return เพราะว่า ถ้าไม่ใช้ return โค้ดมันจะไม่หยุดอ่านที่ตรงนั้นมันจะส่งข้อมูลมาเรื่อยๆ
*/