//เมนูอาหารและราคา 
function getMenuPrice(menu) {
  switch (menu) {
//ราคาเท่ากันรวม case  (จงใจ)
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;

    case "ผัดไทย":
      return 60;

    case "ต้มยำกุ้ง":
      return 120;

    default:
      return 0; //เมนูอื่น ๆ = 0 (ไม่มีในรายการ)
  }
}

//ราคาขนาด
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;

    case "พิเศษ":
      return 1.5;

    case "จัมโบ้":
      return 2;

    default:
      return 1; //ถ้าพิมไม่ถูกจะเป็น 1 default ตีเป็นอื่นๆทั้งหมด
  }
}

// ==========================================
// ส่วนที่ 3 — คำนวณราคารวมของออเดอร์
// ==========================================
// สร้าง Array ของออเดอร์ 5 รายการ (รายการสุดท้ายเป็นเมนูไม่มีในรายการเพื่อทดสอบ default)
const orders = [
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 2 },
  { menu: "ผัดไทย", size: "พิเศษ", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวมันไก่", size: "จัมโบ้", qty: 3 },
  { menu: "กะเพรา", size: "จัมโบ้", qty: 2 }
];

let Total = 0; //สร้างตัวแปรมารวมเงินเริ่ม 0 

console.log("===== รายการสั่งอาหาร =====");

//วนลูปราคา
for (const item of orders) { 
  const price = getMenuPrice(item.menu); //ดึงเมนูกับราคา
  const multiplier = getSizeMultiplier(item.size); // ดึงขนาด
  const itemTotal = price * multiplier * item.qty; // เอาราคา ขนาด จำนวน มาคูณ

//รายการที่สั่ง เมนู ขนาด จำนวน = เท่ากับกี่บาท
  console.log(`${item.menu} (${item.size}) x${item.qty} = ${itemTotal} บาท`);
//ราคารวมกันทั้งหมด ผลลัพที่ได้จะไปอยู่ใน Total เพราะสร้างมันขึ้นมามันเริ่มจาก 0 แล้วเอา total ไปใส่ราคาบิลด้านล่างได้เลย
//เอาไว้ข้างนอกไม่ได้เพราะมันต้องอยู่ในฟังก์ชั่นที่ราคาอาหาร
Total += itemTotal;
}
console.log("---------------------------");
console.log(`ราคาทั้งหมด: ${Total} บาท`);
console.log("===========================");