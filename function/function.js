// Function
// หน้าที่ของ function คือการ group statement เข้าไว้ด้วยกัน
// เมื่อ function execute จะเกิดผลได้ 3 อย่าง
// 1. side effect
// 2. return value
// 3. throw error

// Defining Function

// แบบนี้เรียก function declaration
function square(x) {
  return x * x
}

// แบบนี้เรียก function expression
// ลอง uncomment บรรทัดล่างออก จะเห็นว่า error
// function(){} // ซึ่งจะอยู่โดดๆ ไม่ได้ ต้องเอาไปแปะกับคนอื่น

// แบบนี้เป็นต้น
const makeNoise = function() {
  console.log("Duhhh!")
  // ในกรณีที่ไม่มี return
  // มันจะ return undefined
}
// สองอันนี้ต่างกันที่ order ของการ call ดู ต.ย. ใน declaration_order directory
// การที่เราสามารถ assign function ไปที่ variable ได้ แสดงว่า function เป็น value ชนิดนึง

// Variable and Scope
// เวลาเราประกาศตัวแปร มันจะมาคุ่กับ scope เสมอ
// scope ก็คือ ส่วนของ program ที่มองเห็น variable
// เช่น ถ้าประกาศ variable ไว้นอกสุด ไม่อยู่ใน function หรือ block ไหนๆ เลย
// มันจะเป็น global คือ ทุกส่วนของ program มองเห็นหมด
// * remember: global state is the root of all evil!

// ความต่างระหว่าง let กับ var

function print(v) {
  console.log(v)
}

// var
var myvar = "global"
function f() {
    console.log(myvar) 
  if (true) {
    var myvar = "local"
  }
  console.log(myvar)
}
f()

//let
let myvar = "global"
function f() {
  console.log(myvar) 
  if (true) {
    let myvar = "local"
  }
  console.log(myvar)
}
f()

// parameter และ variable ที่ประกาศใน function
// เป็น local scope
function square(x) {
  return x * x
}
console.log(x) // VM65:4 Uncaught ReferenceError: x is not defined

function hi(name) {
  let prefix = "Hi!, "
  console.log(prefix + name)
}
console.log(prefix) // VM74:5 Uncaught ReferenceError: prefix is not defined

// Nested Scope
// ความเจ๋งของ Javascript คือ ประกาศ function ใน function ได้ด้วย
// ซึ่งจะสร้าง scope ที่ซ้อนลึกเข้าไป
// เรียกว่า Lexical Scope

const hummus = function(factor) {
  // ตัว hummus เองจะเห็นแค่ factor
  const ingredient = function(amount, unit, name) {
    // ตัว ingredient จะเห็นทั้ง amount, unit, name และ factor ด้วย
    let ingredientAmount = amount * factor
    if (ingredientAmount > 1) {
      unit += "s"
    }
    console.log(`${ingredientAmount} ${unit} ${name}`)
  }
  ingredient(1, "can", "chickpeas")
  ingredient(0.25, "cup", "tahini")
  ingredient(0.25, "cup", "lemon juice")
  ingredient(1, "clove", "garlic")
  ingredient(2, "tablespoon", "olive oil")
  ingredient(0.5, "teaspoon", "cumin")
}

// es6 สามารถประกาศ function ได้อีกแบบนึงคือ arrow function
const power = (base, exponent) => {
  let result = 1
  for (let count = 0; count < exponent; count++) {
    result *= base
  }
  return result
}

// ถ้ามี parameter ตัวเดียว สามารถลดรูปได้
const square1 = (x) => { return x * x }
const square2 = x => { return x * x }
// return และ ปีกกา สามารถเอาออกได้ถ้ามี body บรรทัดเดียว
const square3 = x => x * x


// Call Stack
function greet(who) {
  console.log("Hello " + who)
}
greet("Harry")
console.log("Bye")

// เมื่อเรา call greet() สิ่งที่เกิดขึ้นแบบภาพตัด slow
// คือ...
//
// not in function
//    in greet
//         in console.log
//    in greet
// not in function
//    in console.log
// not in function

// ซึ่ง เวลาที่ function call อีก function นึงมันเหมือนการกระโดดข้ามไปมา
// ดังนั้น computer มันจะต้องมีกลไลเพื่อจำว่า พอกระโดดข้ามแล้ว มันจะต้องกลับมาให้ถูกที่ด้วย
// สิ่งนั้นเรียกว่า Call Stack
// ซึ่งแน่นอนว่ามันอยู่ใน memory และถ้า stack มันใหญ่เกินไป computer มันจะ error

function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first."); // Uncaught RangeError: Maximum call stack size exceeded

// Optional Argument
// ถึงแม้ว่าเราจะประกาศ function ใน Javascript
// ด้วยจำนวน parameter ที่เจาะจง ไม่จำเป็นต้อง call ด้วย parameter ตามที่ระบุก็ได้

function square(x) { return x * x; }
console.log(square(4, true, "hedgehog")); // 16 ก็ยัง work ปกติ

// หรือแบบนี้ก็ได้

function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}

minus(10) // -10
minus(10, 5) // 5

// หรือ ถ้าให้สวย es6 มี default value ให้ใช้ด้วย

function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

power(4) // 16
power(2, 6) // 64

// Veradic Function and Rest Parameter
// ด้วยความที่เราสามารถ pass argument เข้าไปกี่ตัวก็ได้
// เราเลยสามารถเขียนที่รับตัวแปรกี่ตัวก็ได้

// es5
// สิ่งที่ชวนให้เข้าใจผิดคือ คิดว่า arguments คือ array
// แต่จริงแล้วมันไม่ใช่ array ลอง arguments.slice ดูก็ได้ มันจะ error
function max() {
  let max = -Infinity
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i]
    }
  }
  return max
}

// es6 ช่วยให้ชัดเจนขึ้น
// ความดีงามของ es6 คือ numbers ตรงนี้เป็น array
// แปลว่าเราสามารถใช้ array method ได้เลย
function max(...numbers) {
  let result = -Infinity
  for (let number of numbers) {
    if (number > result) result = number
  }
  return result
}
max(4, 1, 9, -2) // 9

// Closure
// เนื่อง function คือ value และ local variable ถูกสร้างใหม่ทุกครั้งที่ function ถูก call
// จะเกิดอะไรขึ้นถ้าเราทำแบบนี้

function wrapValue(n) {
  let local = n
  return () => local
}

let wrap1 = wrapValue(1)
let wrap2 = wrapValue(2)
wrap1() // ?
wrap2() // ?

// ปรับอีกนิดนึงเราสามารถเขียน function แบบนี้ก็ได้
function multiplier(factor) {
  return number => number * factor
}

let twice = multiplier(2)
twice(5) // 10

// Recursion
// เมื่อ function call ตัวมันเอง เราเรียกมันว่า recursive function

function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}
power(2, 6)

// Vistualize call
// power(2, 6)
//   2 * power(2, 5)
//     2 * 2 * power(2, 4)
//       2 * 2 * 2 * power(2, 3)
//         2 * 2 * 2 * 2 * power(2, 2)
//           2 * 2 * 2 * 2 * 2 * power(2, 1)
//             2 * 2 * 2 * 2 * 2 * 2 * power(2, 0)
//               2 * 2 * 2 * 2 * 2 * 2 * 1

// แน่นอนว่าเราไม่จำเป็นต้องใช้ recursion เสมอไป
// และตามความเป็นจริงแล้ว recursion สามารถถึงแทนที่ด้วย for-loop ได้เสมอ
// เพียงแต่ในบางปัญหา อาจจะดูซับซ้อนกว่ามาก ถ้าใช้ for-loop

// เช่น ลองแก้ปัญหานี้ดู
// ตั้งต้นด้วยเลข 1
// ให้เราเขียนโปรแกรมที่รับเลขหนึ่งตัว (n) แล้วเช็คว่า
// จาก 1 ถึง n สามารถ +5 หรือ *3 กี่ครั้งก็ได้ จะได้คำตอบ n มั้ย
// ถ้าได้คำตอบช่วยแสดงวิธีการด้วย
// เช่น 13 = (((1 * 3) + 5) + 5)
//     15 = can not

function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history
    } else if (current > target) {
      return null
    } else {
      return find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`)
    }
  }
  return find(1, "1")
}

findSolution(24) // (((1 * 3) + 5) * 3)

// Visualize call เอาแค่ 13 พอ
// find(1, "1")
//   find(6, "(1 + 5)")
//     find(11, "((1 + 5) + 5)")
//       find(16, "(((1 + 5) + 5) + 5)")
//         too big
//       find(33, "(((1 + 5) + 5) * 3)")
//         too big
//     find(18, "((1 + 5) * 3)")
//       too big
//   find(3, "(1 * 3)")
//     find(8, "((1 * 3) + 5)")
//       find(13, "(((1 * 3) + 5) + 5)")
//         found!


// Grow function
// เราพบว่าเราจะเขียน function ใหม่ด้วย 2 กรณี
// 1. พบว่าตัวเองทำงานซ้ำเลยแตกลองที่ซ้ำมาเป็น function
// 2. พบว่าต้องเพิ่ม feature ใหม่ซึ่งใหญ่พอจะมี function เป็นของตัวเอง
// ความท้าทายอยู่ตรงที่จะหาชื่อ function ที่อ่านเข้าใจง่ายๆ ได้ยังไง
// ต.ย. ลองทำโจทย์
// ให้ implement
// function printFarmInventory(cows, chickens) {
//   ...
// }
// โดยที่ cows กับ chickens เป็น number แล้วให้ print จำนวน
// cows และ chickens แบบ zero padding ด้วย
// เช่น
//   007 Cows
//   011 Chickens
// 
// ถ้าเสร็จแล้ว ลองเพ่ิม pigs เข้าไป

// version 1
function printFarmInventory(cows, chickens) {
  let cowString = String(cows)
  while (cowString.length < 3) {
    cowString = "0" + cowString
  }
  console.log(`${cowString} Cows`)
  let chickenString = String(chickens)
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString
  }
  console.log(`${chickenString} Chickens`)
}
printFarmInventory(7, 11)

// version 2
function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number)
  while (numberString.length < 3) {
    numberString = "0" + numberString
  }
  console.log(`${numberString} ${label}`)
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows")
  printZeroPaddedWithLabel(chickens, "Chickens")
  printZeroPaddedWithLabel(pigs, "Pigs")
}

printFarmInventory(7, 11, 3)

// version 3
function zeroPad(number, width) {
  let string = String(number)
  while (string.length < width) {
    string = "0" + string
  }
  return string
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`)
  console.log(`${zeroPad(chickens, 3)} Chickens`)
  console.log(`${zeroPad(pigs, 3)} Pigs`)
}

printFarmInventory(7, 16, 3)

// version 2 เป็น side effect test ยากกว่า
// version 3 เป็น pure function test ง่ายกว่า และ reuse ง่ายกว่า
// แต่ไม่จำเป็นต้องทำ pure function เสมอไปก็ได้
// ค่อยๆ พิจารณาเอาตามสถานการณ์

// *ประเด็น: function ควรมีขนาดเล็ก และทำงานแค่อย่างเดียว


