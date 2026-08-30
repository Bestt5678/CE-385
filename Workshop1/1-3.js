//ค่าเกณฑ์คะแนน (ตั้งชื่อสื่อความหมาย ห้ามใช้เลขดิบในสูตรคำนวณ)
const WORKSHOP_MAX_RAW = 60;   // คะแนนเต็มของ Workshop
const WORKSHOP_WEIGHT = 20;    // คะแนนเต็ม Workshop ใช้คำนวณ
const TOTAL_MAX_SCORE = 100;   // คะแนนเต็มรวมทั้งวิชา
const TARGET_SCORE = 80;       // คะแนนเป้าหมาย
// ตัวแปรเก็บคะแนนตามโจทย์
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

//แปลงคะแนน Workshop ตามสูตรของวิชา: (คะแนนดิบ ÷ 60) × 20
const workshopScore = (workshopRaw / WORKSHOP_MAX_RAW) * WORKSHOP_WEIGHT;

//คำนวณคะแนนรวมทั้งหมดเอามาบวกกัน
const totalScore = workshopScore + attendance + project + midterm + final;

//คำนวณว่าคะแนนรวมคิดเป็นกี่เปอร์เซ็นต์ของคะแนนเต็ม 100
const scorePercentage = (totalScore / TOTAL_MAX_SCORE) * 100;

//คำนวณว่ายังขาดอีกกี่คะแนนจึงจะได้ 80 คะแนน (ถ้าเกินแล้วแสดงเป็นเลขติดลบไปก่อน)
const scoreNeededFor80 = TARGET_SCORE - totalScore;

// แสดงผลเป็นใบสรุปคะแนนด้วย Template Literal ให้อ่านง่าย
//.toFixed(2) คือทศนิยม 2 ตำแหน่ง 
console.log(`===== ใบสรุปผลคะแนนวิชา CE385 =====
Workshop            : ${workshopScore.toFixed(2)} / ${WORKSHOP_WEIGHT} 
Attendance          : ${attendance.toFixed(2)}
Project             : ${project.toFixed(2)}
Midterm             : ${midterm.toFixed(2)}
Final               : ${final.toFixed(2)}
------------------------------------
คะแนนรวมทั้งหมด            : ${totalScore.toFixed(2)} / ${TOTAL_MAX_SCORE}
คิดเป็นเปอร์เซ็นต์            : ${scorePercentage.toFixed(2)}%
คะแนนที่ยังขาดถึงเกณฑ์ 80     : ${scoreNeededFor80.toFixed(2)} คะแนน
====================================`);