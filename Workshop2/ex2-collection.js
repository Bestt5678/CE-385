// ส่วนที่ 1: สร้างข้อมูลตั้งต้น array ของ object จำนวน 6 คน
const studentList = [
  { id: '01', name: 'หนึ่ง',major: 'CE', score: 100, contact: { email:'1@email.com',phone: '0811111111' } }, //นักศึกษาคนที่ 1
  { id: '02', name: 'สอง',major: 'CE', score: 79, contact: { email:'2@email.com',phone: '0822222222' } }, //นักศึกษาคนที่ 2
  { id: '03', name: 'สาม',major: 'CE', score: 50, contact: { email:'3@email.com',phone: '0833333333' } }, //นักศึกษาคนที่ 3
  { id: '04', name: 'สี่',major: 'IT', score: 77, contact: { email:'4@email.com',phone: '0844444444' } }, //นักศึกษาคนที่ 4
  { id: '05', name: 'ห้า',major: 'IT', score: 55, contact: { email:'5@email.com',phone: '0855555555' } }, //นักศึกษาคนที่ 5
  { id: '06', name: 'หก',major: 'IT', score: 66, contact: { email:'6@email.com',phone: '0866666666' } }   //นักศึกษาคนที่ 6
];


//ค้นหานักศึกษาด้วย ID (ใช้ find)
function findById(students, id) {
//คืนค่า object นักศึกษาที่รหัสตรงกัน หรือคืน undefined หากไม่พบ
  return students.find((student) => student.id === id);
}

//ค้นหานักศึกษาตามสาขาวิชา (ใช้ filter)
function findByMajor(students, major) {
//คืนค่า array ของนักศึกษาที่มีสาขาตรงตามที่ระบุ
  return students.filter((student) => student.major === major);
}

//ตรวจสอบว่ามีนักศึกษาตกหรือไม่ (คะแนน < 50)
function hasFailingStudent(students) {
//คืนค่า true หากมีนักศึกษาอย่างน้อย 1 คนได้คะแนนต่ำกว่า 50
  return students.some((student) => student.score < 50);
}

// ดึงอีเมลนักศึกษาตาม ID โดยใช้ Optional Chaining (?.) และ Nullish Coalescing (??)
function getEmail(students, id) {
  // ค้นหานักศึกษาก่อน
  const targetStudent = findById(students, id);
  // ดึง email หากไม่มีให้พิมพ์ไม่พบข้อมูลติดต่อ
  return targetStudent?.contact?.email ?? 'ไม่พบข้อมูลติดต่อ';
}


//หา ID 
console.log('Find ID:', findById(studentList, '01'));
//หาสาขา 
console.log('Find Major:', findByMajor(studentList, 'IT'));
//ดึงอีเมลข้อมูลติดต่อ
console.log('Get Email:', getEmail(studentList, '02'));
//ตรวจสอบว่ามีนักศึกษาตกหรือไม่
console.log('Has Failing Student:', hasFailingStudent(studentList)); //ได้ true เพราะมีนักศึกษาคนที่ 3 และ 4 ตก

//ทดสอบกรณีที่หาไม่เจอ

//สร้างนักศึกษาใหม่ที่ไม่มี 
const studentWithoutContact = { id: '07', name: 'เจ็ด', major: 'CE', score: 70, contact: { email:'7@email.com',phone: '0877777777' } } ; 
//ทดสอบค้นหา ID ที่ไม่มีอยู่จริง
console.log('นักศึกษาที่หาไม่เจอ:', findById(studentList, '9999')); //ได้ undefined
console.log('นักศึกษาที่หาไม่เจอ:', getEmail(studentList, '9999')); //ได้ ไม่พบข้อมูลติดต่อ

//เพิ่มนักศึกษาใหม่เข้า Array 
const updatedStudentList = [...studentList, studentWithoutContact]; //เพิ่มนักศึกษาใหม่เข้า Array

//ทดสอบดึงอีเมลนักศึกษาคนที่ไม่มี contact
console.log('Get Email นักศึกษาที่พึ่งเพิ่มเข้ามา :', getEmail(updatedStudentList, '07')); 