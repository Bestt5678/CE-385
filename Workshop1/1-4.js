// ฟังก์ชันแปลงคะแนนเป็นเกรด
function toGrade(score) {
// ตรวจสอบถ้าคะแนนน้อยกว่า 0 จะผิด ถ้ามากกว่า 100 ก็ผิด
  if (score < 0 || score > 100) 
    {return "คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100";}
 
  //ต้องเรียงจากมากไปน้อยเพราะโค้ดมันอ่านจากบนลงล่างถ้าเอาน้อยขึ้นก่อน 
  //เช่น score >= 0 ก่อน คะแนน 95 โค้ดมันจะไปอ่านค่า score>= 0 มันจะได้ F ทั้งหมดมันจะอ่านค่าไม่้ได้
  if (score >= 80) 
    {return "เกรด A";}
   else if (score >= 75) 
    {return "เกรด B+";}
   else if (score >= 70) 
    {return "เกรด B";}
   else if (score >= 65) 
    {return "เกรด C+";}
   else if (score >= 60) 
    {return "เกรด C";}
   else if (score >= 55) 
    {return "เกรด D+";}
   else if (score >= 50) 
    {return "เกรด D";}
   else
    {return "เกรด F";}
}

//ทดสอบให้ครบทุกค่า 95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120
//(สร้างเป็น array แล้วใช้ for...of วนทดสอบ จะได้ไม่ต้องเขียนซ้ำ 13 รอบ)
const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

for (const score of testScores) {
  const gradeResult = toGrade(score);
  console.log(`คะแนน ${score} -> ${gradeResult}`);
}