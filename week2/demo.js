console.log("ข้อความธรรมดา");
console.error("ข้อความแสดงข้อผิดพลาด");       //ออกทาง stderr          
console.warn("คำเตือน");
console.table([{ชื่อ:"สมชาย",คะแนน:82},{ชื่อ:"สมหญิง",คะแนน:91}]);

console.time("งานหนัก");
//โค้ดที่อยากจับเวลา
console.timeEnd("งานหนัก");                  //งานหนัก: 1.523ms

console.log("1 typeof '42'=", typeof "42");
console.log("3 typeof null=", typeof null);
console.log("5 typeof NaN=", typeof NaN);
console.log("6 '5'+3=","5"+3);
console.log("7 '5'-3=","5"-3);
console.log("8 '0.1'+0.2=",0.1+0.2);
console.log("0.1+0.2===0.3=",0.1+0.2===0.3);
console.log("9 10 / 0 =", 10 / 0);
console.log("10 'abc'*2 =", "abc" * 2);


function getPriceBuggy(size) {
  let price = 0;
  switch (size) {
    case "S":  price = 30;break
    case "M":  price = 45;break
    case "L":  price = 60;break
    default:   price = 0;break
  }
  return price;
}
function getPriceFixed(size) {
  switch (size) {
    case "S": return '30';
    case "M": return '45';
    case "L": return '60';
    default:  return '0';
  }
}
for (const s of ["S","M","L","XL"]) {
  console.log("ขนาด"+s+"→ มีบั๊ก:"+getPriceBuggy(s)+"|แก้แล้ว:"+getPriceFixed(s));
}


//function Declearation -  ประกาศแบบตั้งชื่อ
function add(a,b) {
  return a +b;
}

//fucntion expression - เก็บฟังก์ชันไว้ในตัวแปร
const subtract = function (a,b ){
  return a - b;
};
//arrow function - รูปแบบสั้นใช้บ่อยที่สุดในโค้ดสมัยใหม่
const multiply = (a,b)=>a*b;

console.log ("add(10,3)=", add(10,3));
console.log("subtract(10,3)=", subtract(10,3));
console.log("multiply(10,3)=",multiply(10,3));

function createStudent (name, year =1, isActive = true){
  return {name, year, isActive};    //ชื่อ property ตรงกับชื่อตัวแปร เขียนย่อได้
}

console.log("ไม่ส่ง year=",createStudent("สมชาย"));
console.log("ส่งครบ=",createStudent("สมหญิง",3,false));
console.log("ส่ง  undefined=",createStudent("มานี, undefined"));
console.log("ส่ง null=",createStudent("ปิติ",null),"<-- ค่าเริ่มต้นไม่ทำงาน");
console.log("ส่ง 0=",createStudent("ชูใจ",0),"<-- 0 ก็ถือว่าค่าส่งมาแล้ว");

//--- RestParameter:รับพารามิเจอร์ที่เหลือทั้งหมดเป็น array ---
function sumAll (...numbers) {
  return numbers.reduce((total,n) => total+n,0);
}

console.log("\nsumAll(10,20,30)=",sumAll(10,20,30));
console.log("sumAll()      =",sumAll(),"<---ค่าเริ่มต้น 0 ทำให้ไม่ error");

//rest ต้องอยู่ท้ายสุดเสมอ
function formatScores(studentName,...scores){
  return `${studentName}: ${scores.join(",")}`;
}
console.log(formatScores("สมชาย",78,91,45))


const course = {
  code: "CE385",
  instructor: { name: "สนายุ", email: "sanayu.jin@dpu.ac.th" },
  schedule: { day: "จันทร์", room: "5-701" },
};

console.log("course.code =", course.code);
console.log("course.instructor.email =", course.instructor.email);
console.log("course.assistant =", course.assistant, " <-- undefined ยังไม่ error");

try {
  console.log(course.assistant.name); // เข้าถึงต่อจาก undefined
} catch (error) {
  console.log("course.assistant.name =", error.name + ": " + error.message);
}

// Optional chaining กันพัง
console.log("\ncourse.assistant?.name  =", course.assistant?.name, " <-- ไม่ error");
console.log('?. กับ ?? ใช้คู่กัน =', course.assistant?.name ?? "ยังไม่มีผู้ช่วยสอน");


const students = [
  {id:"6501",name:"สมชาย",score: 78 },
  {id:"6502",name:"สมหญิง",score: 91 },
  {id:"6503",name:"มานี",score: 45 },
  {id:"6504",name:"ปิติ",score: 66 },
];

function toGrade(score) {
  if (score>=80)return "A";
  if (score>=70)return "B";
  if (score>=60)return "C";
  return "F";
}

const scores = [78,91,45,66];
const grade = scores.map((score)=> toGrade(score));
console.log("scores =", scores);
console.log("grade =",grade);
console.log("ต้นฉบับ =", scores, "<-- map ไม่แก้ต้นฉบับ");

//ใช้กับ array ของ object - รูปแบบที่เจอบ่อยที่สุดในงาน Backend
const summary = students.map((student)=>({
  id: student.id,
  name: student.name,
  grade: toGrade(student.score),
}));
console.log ("\nแปลงเป็นรูปที่จะส่งออกทาง API:");
console.log(summary);

//ข้อผิดพลาดที่พบบ่อย : ลืม return ในฟังก์ชันที่มีปีกกา
const forgot = scores.map ((score)=>{toGrade(score);});
console.log("\nลืม return =",forgot, "<--ได้ undefined ทั้งหมด");

