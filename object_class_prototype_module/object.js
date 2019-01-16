// Object
// Core concept ของ object คือ การ group functionality กับ state ไว้ด้วยกัน

// Methods
// ก็คือ property ที่ถูก assign ด้วย function
let rabbit = {}
rabbit.speak = function(line) {
  console.log(`The rabbit says ${line}`)
}
rabbit.speak()

// ปกติ method มันต้องจะต้องสัมพันธ์อะไรบางอย่างกับ object
// เช่นในกรณีนี้ใน print type ของ object ออกมาด้วย
// สังเกตุที่ this จะถูกผูกกับ property type ของ object ที่ method ถูก call

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}
let whiteRabbit = { type: 'white', speak }
let hungryRabbit = { type: 'hungry', speak }

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
// The white rabbit says 'Oh my ears and whiskers, how late it's getting!'

hungryRabbit.speak("I could use a carrot right now.");
// The hungry rabbit says 'I could use a carrot right now.'

// หรือให้ call function

speak.call(hungryRabbit, "Burp!")
// The hungry rabbit says 'Burp!'

// *ข้อควรระวัง เนื่องจากเราประกาศ function ด้วย keyword 'function' 
// ดังนั้น this จะ refer ถึงค่าที่ต่างกัน แล้วแต่วิธีการ call
// เพราะฉะนั้นอย่าคาดหวังว่ามันต้องผูกติดกับ object ที่ครอบมันเสมอไป
// ตรงจุดนี้เองที่ arrow function ทำงานไม่เหมือน function ธรรมดา

function normalize() {
  console.log(this.coords.map(n => n / this.length))
}
normalize.call({coords: [0, 2, 3], length: 5}) // [0, 0.4, 0.6]


// Prototype

let empty = {}
empty.toString // ƒ toString() { [native code] }
empty.toString() // [object Object]

// mehtod toString() มาได้ยังไงนะ?

// มันคือ ไสยศาสตร์! ล้อเล่น มันคือ Prototype!

Object.getPrototypeOf({}) == Object.prototype  // true
Object.getPrototypeOf(Object.prototype) // null

// Prototype ก็คือ กลไก ของ Javascript ที่ทำให้ object อันนึงสามารถ เรียกใช้/สืบทอด 
// property และ method จาก object อีกอันนึงได้ ผ่านสิ่งที่เรียกว่า prototype chain

// method toString() ด้านบน จริงๆ แล้วเป็น method ที่อยู่ใน root object ของ Javascript

Object.prototype

// ด้านล่างนี้คือ สิ่งที่อยู่ใน Object.prototype
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()

// ไม่จำเป็นที่ object ทุกตัวจะมี prototype เป็น Object.prototype ตรงๆ
// จริงๆ แล้ว Javascript มี prototype ตัวอื่นๆ อีกเช่น

Array.prototype
Function.prototype

// เราสามารถสร้าง object โดยที่ระบุ prototype object ได้ด้วย method Object.create(..)

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
}
let killerRabbit = Object.create(protoRabbit)
killerRabbit.type = "killer"
killerRabbit.speak("SKREEEE!") // The killer rabbit says 'SKREEEE!'

// Class
// คือ concept ที่เอาไว้ระบุ spec ของ object
// แล้วเมื่อเราสร้าง object ใหม่จาก class นั้นๆ เราจะเรียก object นั้นว่าเป็น instance ของ class

// ดังนั้น เราสามารถใช้ Prototype เพื่อทำให้เกิด concept ของ class ได้ เช่น

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
}

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit)
  rabbit.type = type
  return rabbit
}

// อีกแบบนึงที่ Javascript เตรียมไว้ให้เราคือ ใช้ keyword 'new'
// แต่ form ของการประกาศ class จะเปลี่ยนไปอีกนิดนึง

function Rabbit(type) {
  this.type = type
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}

let weirdRabbit = new Rabbit("weird")
// function Rabbit อันนี้จะเรียกว่า constructor function
// และนิยมขึ้นต้นด้วยอักษษรตัวใหญ่

// สองบรรทัดด้านล่างแสดงความสัมพันธ์ ระหว่าง
// function กับ protoype และ
// object กับ prototype
Object.getPrototypeOf(Rabbit) == Function.prototype // true
Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype // true

// Class notation
// Javascript es6 เตรียม keyword 'class' มาให้เราใช้ด้วย
// ซึ่งจริงๆ แล้ว เหมือนกับโค้ดด้านบนนั่นแหละ

class Rabbit {
  constructor(type) {
    this.type = type
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
}

let killerRabbit = new Rabbit("killer")
let blackRabbit = new Rabbit("black")

// Overriding
Rabbit.prototype.teeth = "small"
console.log(killerRabbit.teeth) // small
killerRabbit.teeth = "long, sharp, and bloody"
console.log(killerRabbit.teeth) // long, sharp, and bloody
console.log(blackRabbit.teeth) // small
console.log(Rabbit.prototype.teeth) // small

// Map
// คือ datastructure อย่างนึงที่มี key กับ value
// จริงๆ แล้ว object เองก็เหมือน map นั่นแหละ
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
}

// แต่ปัญหาคือมันไม่ได้มีแค่ key กับ value ของตัวเอง
console.log(`Júlia is ${ages["Júlia"]}`) // Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages) // Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages) // Is toString's age known? true

// ถ้าอยากได้ พฤติกรรมที่เหมือน map อาจจะต้องท่าประหลาดนิดนึง
console.log("toString" in Object.create(null)) // false

// ใน es6 เลยมี map มาให้เลย
let ages = new Map()
ages.set("Boris", 39)
ages.set("Liang", 22)
ages.set("Júlia", 62)

console.log(`Júlia is ${ages.get("Júlia")}`) // Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack")) // Is Jack's age known? false
console.log(ages.has("toString")) // false

// Polymorphism
// คือ การที่ type ต่าง type กันสามารถตอบตนองต่อ method call อันเดียวกันได้
// ในแบบของตัวเอง

Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`
}

console.log(String(blackRabbit)) // a black rabbit

// Inheritance
// แน่นอนว่าเป็น class ก็จะสามารถสืบทอดความสามารถกันได้
// Javacript มี keyword 'extends' ให้เราเอาไว้ทำ inheritance ได้

class Animal {
  constructor(name) {
    this.name = name
  }
  speak() {
    console.log(`Hi, I'm ${this.name}`)
  }
  legs() {
    return 0
  }
}

class Rabbit extends Animal {
  constructor(name) {
    super(name)
  }
  legs() {
    return 4
  }
}

let rabbit = new Rabbit('pongneng')
console.log(rabbit.speak()) // 'Hi!, I'm pongneng'
console.log(rabbit.legs()) // 4


