Reversing an array
implement function reverseArray ที่รับ input เป็น array
แล้ว return output เป็น reserve order ของ input array
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];

implement function reverseArrayInPlace ที่รับ input เป็น array
ไม่ต้อง return ค่า แต่ให้ side-effect เป็น reserve order บน input array แทน
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]