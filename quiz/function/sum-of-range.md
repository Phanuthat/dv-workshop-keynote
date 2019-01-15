Sum of range
เขียน function range ที่รับ input เป็น เลข 2 เลข แล้ว return ouput เป็น
array ของเลขระหว่าง 2 เลขเรียงกัน

เขียน function sum ที่รับ input เป็น array ของตัวเลข แล้ว return ค่าเป็น sum
ของเลขทั้งหมดใน array

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(sum(range(1, 10)));
// → 55


bonus: ลองเพิ่ม parameter ตัวที่ 3 ให้ function range เป็น step ของเลข รองรับเลขติดลบด้วย

console.log(range(1, 10, 2));
// → [1, 3, 5, 7, 9]

console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

