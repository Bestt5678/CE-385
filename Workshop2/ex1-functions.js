//ตัวแปรคะแนนเกรด
const GRADE_THRESHOLDS = [
  { minScore: 80, grade: 'A' }, { minScore: 75, grade: 'B+' },
  { minScore: 70, grade: 'B' }, { minScore: 65, grade: 'C+' },
  { minScore: 60, grade: 'C' }, { minScore: 55, grade: 'D+' },
  { minScore: 50, grade: 'D' }, { minScore: 0,  grade: 'F' }
];

//ฟังก์ชันตรวจสอบความถูกต้องของคะแนน
const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

//ฟังก์ชันแปลงคะแนนเป็นเกรด
function toGrade(score) {
//ตรวจสอบความถูกต้องของคะแนนผ่าน isValidScore ก่อนเสมอ
  if (!isValidScore(score)) {
//แจ้งเตือนหากคะแนนไม่อยู่ในเกณฑ์ 0-100 หรือไม่ใช่ตัวเลข
    return 'Invalid Score';
  }
//ค้นหาเกรดที่ตรงกับเงื่อนไขคะแนนโดยใช้ array + find
  const foundCriterion = GRADE_THRESHOLDS.find((item) => score >= item.minScore);
//คืนค่าตัวอักษรเกรดที่หาได้
  return foundCriterion.grade;
}

// ฟังก์ชันแปลงคะแนนดิบ Workshop  ใช้ Default Parameter
const calculateWorkshopScore = (raw, full = 60, weight = 20) => (raw / full) * weight;
//raw: พารามิเตอร์ปกติที่ไม่มีค่าเริ่มต้น (ต้องส่งค่าเข้ามาเสมอ)
//full = 60: หากไม่ส่งค่า full มา จะใช้ค่า 60 เป็นค่าตั้งต้น
//weight = 20: หากไม่ส่งค่า weight มา จะใช้ค่า 20 เป็นค่าตั้งต้น

// ฟังก์ชันคำนวณคะแนนรวม 5 ส่วน
function calculateTotal(workshop, attendance, project, midterm, final) {
  // คืนค่าผลรวมของคะแนนทุกส่วน
  return workshop + attendance + project + midterm + final;
}

//แสดงผลและทดสอบฟังก์ชัน

//สร้างข้อมูลนักศึกษา 3 คน workshopแบบแปลงค่า attendance project midterm final
const student1Total = calculateTotal(calculateWorkshopScore(50), 10, 18, 22, 25); //คำนวณคะแนนรวมคนที่ 1
const student2Total = calculateTotal(calculateWorkshopScore(40), 8, 15, 18, 20);  //คำนวณคะแนนรวมคนที่ 2
const student3Total = calculateTotal(calculateWorkshopScore(60), 10, 20, 25, 28); //คำนวณคะแนนรวมคนที่ 3

//สร้าง Array แสดงผลตาราง
const studentsSummary = [
  { Name: 'หนึ่ง', TotalScore: student1Total, Grade: toGrade(student1Total) }, // เก็บข้อมูลคนแรก
  { Name: 'สอง', TotalScore: student2Total, Grade: toGrade(student2Total) }, // เก็บข้อมูลคนที่สอง
  { Name: 'สาม', TotalScore: student3Total, Grade: toGrade(student3Total) }  // เก็บข้อมูลคนที่สาม
];

// แสดงผลลัพธ์การคำนวณคะแนนนักศึกษาเป็นตาราง
console.table(studentsSummary);

//ทดสอบค่าเริ่มต้น ตามโจทย์
const testdefault1 = calculateWorkshopScore(48);
const testdefault2 = calculateWorkshopScore(48, 60, 20);
const testdefault3 = calculateWorkshopScore(48, undefined, 25); 

// แสดงผลเปรียบเทียบค่า
console.log('ทดสอบ 1 (Default):', testdefault1); // ได้ 16
console.log('ทดสอบ 2 (Explicit):', testdefault2); // ได้ 16 (ผลลัพธ์เท่ากับ ทดสอบ 1)
console.log('ทดสอบ 3 (Undefined Full):', testdefault3); // ได้ 20 (ใช้ full=60 ตาม default แต่เปลี่ยน weight=25)

//ทดสอบค่าเริ่มต้น ตามโจทย์
//calculateWorkshopScore 48 และ 48 60 20 ได้ผลลัพธ์ 16 เท่ากัน เพราะ  ใช้ค่าเริ่มต้น full=60 และ weight=20 ถ้าไม่มีการส่งค่าเข้ามา
//undefined ตำแหน่งที่สอง จะทำให้ JS ข้ามการรับค่าและดึงค่าเริ่มต้นมาใช้ full = 60 มาใช้และข้าม แต่ยังระบุ weight = 25ได้ปกติ
