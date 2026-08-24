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

