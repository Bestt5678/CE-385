const nickname = "เบส"; //ชื่อ
const studentId = "67112845"; //รหัสนักศึกษา
const age = 20; //อายุ
const major = "วิศวกรรมคอมพิวเตอร์"; //สาขาวิชา
const registeredSubjects = 6; //จำนวนวิชาที่ลงทะเบียน

// ประกาศตัวแปรสำหรับคำนวณปีที่จะจบ
const currentYear = 2569; //ปีปัจจุบัน
const yearsRemaining = 2; // ปีที่เหลือ สมมติเหลืออีก 2 ปีตามโจทย์

//Template Literal เครื่องหมาย Backtick ` ` และ ${} 
console.log (`===== บัตรแนะนำตัว =====
ชื่อเล่น      : ${nickname}
รหัสนักศึกษา  : ${studentId}
อายุ        : ${age} ปี
สาขาวิชา    : ${major}
ลงทะเบียน   : ${registeredSubjects} วิชา
ปีที่จะจบ     : ${currentYear + yearsRemaining}
======================`);