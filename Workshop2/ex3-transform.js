//ฟังก์ชันตรวจความถูกต้องและตัดเกรดจากข้อ 1 
const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;
const GRADE_THRESHOLDS = [
  { minScore: 80, grade: 'A' }, { minScore: 75, grade: 'B+' },
  { minScore: 70, grade: 'B' }, { minScore: 65, grade: 'C+' },
  { minScore: 60, grade: 'C' }, { minScore: 55, grade: 'D+' },
  { minScore: 50, grade: 'D' }, { minScore: 0,  grade: 'F' }
];
const toGrade = (score) => isValidScore(score) ? GRADE_THRESHOLDS.find((item) => score >= item.minScore).grade : 'F';

//ข้อมูลนักศึกษาสำหรับทดสอบ
const studentList = [
  { id: '01', name: 'หนึ่ง',major: 'CE', score: 80 },
  { id: '02', name: 'สอง',major: 'IT', score: 79 },
  { id: '03', name: 'สาม',major: 'CE', score: 74 },
  { id: '04', name: 'สี่',major: 'IT', score: 49 },
  { id: '05', name: 'ห้า',major: 'CE', score: 69 }
];


//ดึงรายชื่อนักศึกษาทุกคนด้วย map
const getNames = (students) => students.map((student) => student.name);

//ดึงนักศึกษาที่สอบผ่าน (คะแนน >= 50) ด้วย filter
const getPassedStudents = (students) => students.filter((student) => student.score >= 50);

//คำนวณผลรวมคะแนนทั้งหมดด้วย reduce ใส่ค่าเริ่มต้นเป็น 0 ป้องกัน error เมื่อ array ว่าง
const getTotalScore = (students) => students.reduce((sum, student) => sum + student.score, 0);

//คำนวณคะแนนเฉลี่ย ป้องกัน array ว่างเพื่อไม่ให้ได้ NaN
function getAverageScore(students) {
//ตรวจสอบถ้าไม่มีข้อมูลใน array ให้คืนค่า 0 
  if (students.length === 0) {
    return 0;
  }
//คำนวณค่าเฉลี่ยและแปลงเป็นทศนิยม 2 ตำแหน่ง
  return Number((getTotalScore(students) / students.length).toFixed(2));
}

//นับจำนวนแยกตามเกรดด้วย reduce ใส่ค่าเริ่มต้นเป็น object ว่าง {}
const countByGrade = (students) => 
  students.reduce((accumulator, student) => {
//หาเกรดของนักศึกษาคนปัจจุบัน
    const grade = toGrade(student.score);
//นับเพิ่มจำนวนเกรดใน object สะสม
    accumulator[grade] = (accumulator[grade] || 0) + 1;
//คืนค่า object สะสมกลับไป
    return accumulator;
  }, {});

//หาคนได้คะแนนสูงสุดด้วย reduce ใส่ค่าเริ่มต้นเป็น undefined ป้องกัน error เมื่อ array ว่าง
const getTopStudent = (students) => 
  students.reduce((topStudent, currentStudent) => {
//เปรียบเทียบคะแนนเพื่อเก็บคนที่มีคะแนนมากกว่าไว้
    return (!topStudent || currentStudent.score > topStudent.score) ? currentStudent : topStudent;
  }, undefined);

//เอาข้อมูลมาเป็นบรรทัดเดียว

//filter หา CE ผ่าน map เอาเฉพาะคะแนน แล้วไป reduce คำนวณเฉลี่ย ใส่ค่าเริ่มต้น 0
const cePassedAverage = studentList.filter((s) => s.major === 'CE' && s.score >= 50).map((s) => s.score).reduce((acc, score, _, arr) => acc + score / arr.length, 0);

//ทดสอบกรณี Array ว่าง []

const emptyList = []; // สร้าง Array ว่างเพื่อทดสอบกรณีขอบ (Edge Case)

//ทดสอบฟังก์ชันกับ Array ว่าง
console.log('CE Passed Average:', Number(cePassedAverage.toFixed(2))); // พิมพ์คะแนนเฉลี่ย CE
console.log('getNames([]):', getNames(emptyList));                     // คืนค่า []
console.log('getPassedStudents([]):', getPassedStudents(emptyList));   // คืนค่า []
console.log('getTotalScore([]):', getTotalScore(emptyList));           // คืนค่า 0
console.log('getAverageScore([]):', getAverageScore(emptyList));       // คืนค่า 0 (ไม่ใช่ NaN)
console.log('countByGrade([]):', countByGrade(emptyList));             // คืนค่า {}
console.log('getTopStudent([]):', getTopStudent(emptyList));           // คืนค่า undefined