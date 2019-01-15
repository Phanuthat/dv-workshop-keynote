// Expression คือ หน่วยของ code ที่ย่อยที่สุดที่ produce value
// Statement คือ การประกอบตัวกันของ expression

// Variable
// เมื่อมี values เกิดขึ้นใน program แล้ว program จะทำยังไงเพื่อจดจำ values นั้นๆ
// คำตอบก็คือ variable นั่นเอง (อีกชื่อนึงของมันคือ binding)

// เราใช้ keyword let ในการสร้าง ตัวแปรได้

let square = 5 * 5;

// หลังจากประกาศตัวแปร แล้วมันสามารถเปลี่ยนค่าได้

square = 10 * 10;

// หรือ const ก็ได้ ย่อมาจาก constant คือประกาศแล้วจะเปลี่ยนค่าไม่ได้

const limit = 5;

limit = 10; // VM702:1 Uncaught TypeError: Assignment to constant variable.

// ชื่อตัวแปรมีสามารถเป็นอะไรก็ได้ที่ไม่ใช่ reserved word และมี special character ได้ 2 ตัวคือ $ กับ _
// นี่ คือ list ของ reserved word
//
// break case catch class const continue debugger default
// delete do else enum export extends false finally for
// function if implements import interface in instanceof let
// new package private protected public return static super
// switch this throw true try typeof var void while with yield
//
// กลุ่มของ reserved word พวกนี้ที่เตรียมไว้ให้เราใช้เรียกว่า Environment
// ซึ่งจริงๆ จะมีมากกว่านี้อีก ขึ้นอยู่กับ Environment ต่างๆ เช่น Browser ก็มี
// keyword ที่เอาไว้สื่อสารกับ window หรือ document เป็นต้น
// * ไม่ต้องจำนะครับ เพราะระบบมันจะป้องกันด้วยตัวของมันเองอยู่แล้ว เช่น assign ไม่ได้ หรือ อาจจะ error

// นอกจาก keyword ต่างๆ แล้ว Enviroment ต่างๆ มักจะเตรียม function บางอย่างเพื่อให้เราใช้งานด้วย
// เช่นถ้าอยู่ใน browser

prompt("Enter something");

// ถ้าอยู่ใน node

require("module_name");

// หรือ บางอย่างก็ Built-in มากับ Javascript เลย มีให้ใ้ทุกๆ Environment

console.log("hello");

// Return value
// expression ต่างๆ ที่เราเขียนขึ้น มันจะแสดงผลออกมา 3 แบบ
// 1. ไปเปลี่ยน internal state ของระบบ เราเรียกว่า side effect

prompt("Enter something");

// 2. คืนค่าผลลัพท์บางอย่างกลับมา

Math.max(2, 4); // 4

// 3. throw error ในกรณีที่เกิดข้อผิดพลาด อย่างการ re-assign const variable

// Control Flow ใน Javascript

// If-else

let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) { // ในวงเว็บปีกกา {} อันนี้เรียกว่า block
  console.log("Your number is the square root of " + theNumber * theNumber);
} else {
  console.log("Hey. Why didn't you give me a number?");
}

// While loop
// 2^10
let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);

// For loop
// 2^10
let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
  result = result * 2;
}
console.log(result);

// Break out of loop
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break; // หรือ ใช้ continue ก็ได้ ถ้าอยากให้เริ่ม iteration ถัดไปทันที
  }
}

// Switch case
// ไม่ค่อยนิยมเท่าไรใน Javascript
// ไปใช้ If-else ดีกว่า
switch (prompt("What is the weather like?")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny": // ปัญหาหลักอยู่ตรงนี้ คือ ถ้าลืม break มัน fall through ไป case อื่น
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}

// Naming variable
// อันนี้ style ต่างๆ
//
// fuzzylittleturtle
// fuzzy_little_turtle  < snake case ก็ฮิต แต่พิมพ์ลำบาก
// FuzzyLittleTurtle
// fuzzyLittleTurtle    < camel case ฮิตสุด เพราะพิมพ์ง่ายกว่า

// Exercise triangle, fizzbuzz, chessboard