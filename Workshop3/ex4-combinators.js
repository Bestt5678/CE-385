//เครื่องมือจำลองตามโจทย์ (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

//ฟังก์ชันสร้าง Timeout สำหรับสถานการณ์ที่ 4
const timeoutPromise = (ms) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout Exceeded')), ms);
  });
//ฟังก์ชันที่จะรันการทดสอบทั้งหมด
async function main() {
  console.log('=== สถานการณ์ที่ 1: หน้าแรก (ใช้ Promise.all) ===');
//ต้องรอให้ทุกส่วนโหลดครบถ้วน หากมีส่วนใดส่วนหนึ่งล้มเหลว หน้าแรกจะไม่สามารถเปิดได้
  try {
//รอให้โหลดให้หมดถ้าสำเร็จจะได้ Array ของผลลัพธ์แต่ถ้ามีอันนึงล้มเหลวจะ แคช
    const pageData = await Promise.all([
      wait(300, 'โปรไฟล์'),
      wait(400, 'ตารางเรียน'),
      wait(500, 'ประกาศ')
    ]);
    console.log('เปิดหน้าแรกสำเร็จ:', pageData);
  } catch (error) {
    console.log('หน้าแรกเปิดไม่ได้:', error.message);
  }

//ทดสอบสถานการณ์ที่ 1 กรณีชิ้นใดชิ้นหนึ่งล้มเหลว
  try {
    await Promise.all([
      wait(300, 'โปรไฟล์'),
      wait(400, 'ตารางเรียน'),
      wait(500, 'ประกาศ', true) //กำหนดให้ล้มเหลว
    ]);
  } catch (error) {
    console.log('หน้าแรกเปิดไม่ได้ (กรณีมีส่วนล้มเหลว):', error.message);
  }

  console.log('\n=== สถานการณ์ที่ 2: แจ้งเตือนผลสอบ (ใช้ Promise.allSettled) ===');
//ต้องการส่งแจ้งเตือนทุกช่องทาง โดยช่องทางที่ส่งไม่ผ่านต้องไม่ทำให้กระบวนการทั้งหมดพัง
  const notificationResults = await Promise.allSettled([
    wait(300, 'อีเมล'),
    wait(500, 'SMS', true), // ล้มเหลว
    wait(400, 'แอป')
  ]);
//แสดงผลลัพธ์ของแต่ละช่องทาง
  notificationResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
//หากสำเร็จ result.value จะเก็บค่าที่ resolve
      console.log(`ช่องทางที่ ${index + 1} ส่งสำเร็จ: ${result.value}`);
    } else {
//หากล้มเหลว result.reason จะเก็บ Error object
      console.log(`ช่องทางที่ ${index + 1} ล้มเหลว: ${result.reason.message}`);
    }
  });

  console.log('\n=== สถานการณ์ที่ 3: Mirror Server (ใช้ Promise.any) ===');
  // เหตุผล: ต้องการข้อมูลจาก Server ตัวแรกที่ทำงานสำเร็จ ไม่สนใจตัวที่ทำงานล้มเหลว
  try {
    const firstSuccessData = await Promise.any([
      wait(300, 'mirror-A', true), // ล้มเหลว
      wait(600, 'mirror-B')        // สำเร็จ
    ]);
    console.log('ใช้ข้อมูลจาก:', firstSuccessData);
  } catch (error) {
    console.log('ทุก Server ล้มเหลวทั้งหมด');
  }

  console.log('\n=== สถานการณ์ที่ 4: ค้นหาฐานข้อมูลมี Timeout (ใช้ Promise.race) ===');
  //แข่งเวลาระหว่างการดึงข้อมูลจริงกับการจำกัดเวลา (Timeout) หากเกินเวลาจะดึงข้อมูลแคชมาใช้แทน
  try {
    const dbResult = await Promise.race([
      wait(1200, 'ข้อมูลฐานข้อมูล'),
      timeoutPromise(800)
    ]);
    console.log('ผลการค้นหา:', dbResult);
  } catch (error) {
    console.log('เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน');
  }
}

//เรียกใช้งานฟังก์ชันหลัก
main();