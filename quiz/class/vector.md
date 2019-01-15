A vector type

เขียน class Vec ที่ใช้แทน vector ใน 2D space
รับค่า x, y เป็น coordiate
class ต้องรองรับ 2 method
plus(vec) รับ parameter เป็น vector แล้ว return ค่าเป็น ผลบวกของ vector สองตัว
minus(vec) รับ parameter เป็น vector แล้ว return ค่าเป็น ผลลบของ vector สองตัว

มี property length ที่ return ค่าเป็นความยาวของ vector
*length คือ ความยาวของ vector จากจุด (0, 0)

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5