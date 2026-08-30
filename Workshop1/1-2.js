//ส่วนที่ 1 — สร้างตัวแปรให้ครบ 6 ชนิด (string · number · boolean · undefined · null · array) 
//แล้วแสดง ค่า คู่กับ ชนิด ของแต่ละตัว รูปแบบ ค่า: สวัสดี | ชนิด: string
const myString = "สวัสดี"; //ข้อความ
const myNumber = 1; //เลขอะไรก็ได้
const myBoolean = true; // ใช่ ไม่ใช่
let myUndefined; //ระบบบอกว่ายังไม่มีค่า (ลืมใส่)
const myNull = null; //จงใจบอกว่าไม่มีค่า (เช่น ผู้ใช้ยังไม่ได้ใส่เบอร์โทร)
const myArray = [1]; //[] คือ Array 
//แสดงข้อความข้างบนใช้ ${} และ  backtick ` `
console.log(`ค่า: ${myString} | ชนิด: ${typeof myString}`);
console.log(`ค่า: ${myNumber} | ชนิด: ${typeof myNumber}`);
console.log(`ค่า: ${myBoolean} | ชนิด: ${typeof myBoolean}`);
console.log(`ค่า: ${myUndefined} | ชนิด: ${typeof myUndefined}`);
console.log(`ค่า: ${myNull} | ชนิด: ${typeof myNull}`);
console.log(`ค่า: ${myArray} | ชนิด: ${typeof myArray}`);


//ส่วนที่ 2 — ตอบคำถามด้วยโค้ด (แสดงผลออกทาง console)
//คำถาม 1 typeof null ได้ผลว่าอะไร และผลนั้นถูกต้องตามความเป็นจริงหรือไม่
console.log(`1) typeof null ได้ผลว่าอะไร และผลนั้นถูกต้องตามความเป็นจริงหรือไม่:"${typeof null}" ไม่ถูกต้องตามความเป็นจริง typeof null ได้ "object" (บั๊กของตัวภาษา)·typeof [] ก็ได้ "object" เช่นกัน`);
//คำถาม 2 ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็นอะไร
let testVar;
console.log(`2) ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็นอะไร: "${typeof undefined}"`);
//คำถาม 3 typeof NaN ได้ผลว่าอะไร (สร้าง NaN ด้วย Number("abc"))
const nanValue = Number("abc");
console.log(`3) typeof NaN ได้ผลลัพธ์เป็น: "${typeof nanValue}" (เพราะ NaN ย่อมาจาก Not a Number )`);


//ส่วนที่ 3 — การแปลงชนิด สมมติได้ค่าจากผู้ใช้มาเป็นข้อความเสมอ const inputAge = "20"; และ const inputScore = "85.5";
const inputAge = "20";
const inputScore = "85.5";

//แปลง inputAge เป็นตัวเลขแล้วบวก 5 ให้ได้ 25 (ไม่ใช่ "205")
const ageResult = Number(inputAge) + 5;
console.log(`ผลบวกอายุ: ${ageResult}`); // ถ้าพิม 20+5 จะได้ 205
//แปลง inputScore แล้วแสดงผลโดยมีทศนิยม 1 ตำแหน่ง
const scoreResult = Number(inputScore).toFixed(1);
console.log(`คะแนนทศนิยม 1 ตำแหน่ง: ${scoreResult}`); // .toFixed(1) บังคับให้มีทศนิยม 1 ตำแหน่ง
//แสดงว่า inputAge === 20 กับ Number(inputAge) === 20 ได้ผลต่างกันอย่างไร
console.log(`inputAge === 20 ได้ผลลัพธ์: ${inputAge === 20}`); 
//false เพราะ inputAge เป็น string คือข้อความปกติ
console.log(`Number(inputAge) === 20 ได้ผลลัพธ์: ${Number(inputAge) === 20}`); 
//true เพราะ  Number ข้างหน้าแปลงข้อความ inputage ที่อยู่ในวงเล็บก่อนจะใส่เท่ากับ 20