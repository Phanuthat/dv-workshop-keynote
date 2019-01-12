// String

// ประกาศได้ 3 แบบ

`There is a season for everything`
"There is a time to born and a time to die"
'A time to happy and a time to cry'

// แบบ ` backtick จะ มีหลายๆ line ได้ และสามารถทำ string interpolation ได้
`There is a season 
for everything`

`Half of 100 is ${100/2}.`

// string escape คือการที่เราอยากใส่ค่า พิเศษลงไปใน string
// เช่น อยากให้มี quote ใน string

"\"carpe diem seize the day\" he said"

// อยากขึ้นบรรทัดใหม่ก็ \n
"well this is the end \n I should be one the new line"

// แล้วถ้าอยากได้ blackslash?

"Here is the backslash \\"

// string เอามา concat กันได้

"Look !" + " I'm" + " concating the" + " string"

// String encoding
// อย่างที่เรารู้อยู่แล้วว่า value ใน computer มันมีได้หลาย type ซึ่งแต่ละ type ก็มี 
// bit pattern และ memory block ที่ไม่เหมือนกัน แม้แต่ข้อมูลที่เป็นตัวเลขเหมือนกัน อาจจะมี bit pattern
// และ memory block ต่างกันก็ได้ ถ้าหาก type ไม่เหมือนกัน ยกตัวอย่างตัวเลขใน strong type language พวก Java หรือ Go
// แค่เลขอย่างเดียวเรามีทั้ง int8, int16, int32, uint, inptr and etc.
// ดังนั้น string ก็ไม่ต่างกัน ถึงแม้ตัว เราจะมี string แค่ type เดียวในการเก็บ string
// แต่ bit pattern และ memory block ของ string ตัวเดียวกันอาจจะไม่เหมือนกันก็ได้
// สิ่งนี้เรียกว่า string encoding
// encoding ฮิตๆ ที่เราน่าจะเคยได้ยินเช่น utf8, ascii, tis620 and etc.

// ถ้าไม่เคยได้ยินเรื่อง Character Encoding เลย แนะนำบทความนี้ครับ
// https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/

// ASCII
// ในสมัยพระเจ้าเหาเต่าล้านปี เรามี character encoding ตัวนึงที่ชื่อว่า ASCII
// ย่อมาจาก American Standard Code for Information Interchange
// คือ การเอา bit จำนวน 8 bits มาเก็บ character
// ประมาณนี้
// https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html

// Unicode
// แน่นอนว่า 8 bits มันไม่พอสำหรับคนทั้งโลก แต่การจะมี encoding มากมาย สำหรับคนทั้งโลกก็ดูลำบากเกินไป
// เราเลยแก้ปัญหาด้วยการสร้างสิ่งที่เรียกว่า Unicode ขึ้นมาเพื่อใช้แสดงตัวอักษรที่มีขึ้นทั้งหมดในโลก
// เวลาพูดถึง Unicode จะมีศัพท์ 2 คำที่เราจะได้ยิน
// 1. Code Point คือ การเอาเลขมา map กับ symbol เช่น U+0041 คือ ตัว A
//     U+ ระบุว่าเลขต่อจากนี้คือ Code Point
//     0041 คือ Code Point
// 2. Encoding คือการแปลงเลข Code Point ไปเป็น bit pattern ที่เก็บใน memory ซึ่งแล้วแต่ว่าจะใช้ unicode encoding ตัวไหน
//    เช่น utf8, utf16 หรือ utf32 ทั้งหมดนี้มีวิธีการเรียง bit pattern ไม่เหมือนกัน
//
// Code Point สามารถมีค่าได้ตั้งแต่ U+000000 ถึง U+10FFFF (ประมาณ 1.1 ล้าน ตัวอักษร)
// Code Point ถูกแบ่งกลุ่มเป็นกลุ่มทั้งหมด 17 กลุ่ม (Plane) กลุ่มละ 65536 ตัวอักษร
// ส่วนใหญ่เราทำงานกับกลุ่มแรกเรียกว่า BMP (Basic Multiligual Plane)
// ซึ่งมี Code Point ตั้งแต่ U+0000 ถึง U+FFFF
// ที่เหลือตั้งแต่ 2-17 เราเรียกว่า Supplementary Plane หรือ Astral Plane
//
// *ดังนั้นเวลาเราทำงานกับ string ไม่ว่าจะภาษาไหนก็ตาม เราต้องรู้ encoding ของมัน

// เริ่มจากสิ่งแรกที่ต้องรู้คือ string ใน javascript เมื่อเราประกาศมันขึ้นมาแล้ว default encoding ของมันคือ UCS-2 หรือ อีกชื่อนึงคือ UTF-16 without BOM
// UTF-16 ไม่ได้แปลว่า เก็บอักษรโดยใช้ 16 bits นะครับ มันเป็น variable length คือ เริ่มจาก 16 bits และอาจจะขยายไปเป็น 32 bits

"A".length // 1
"\x41".length // 1
"\u0041".length // 1

"a".length // 1
"\x41".length // 1
"\u0041".length // 1

"💩".length // 2 
"'\uD83D\uDCA9'".length // 2
"\u{1F4A9}".length // 2 แม้ว่าเราจะ escapse เป็น unicode แล้วก็จริง แต่มันก็ยังคงเก็บเป็น utf-16 อยู่ดีนะครับ

// BOM (Byte Order Mark)
// ยกตัวอย่างอักษร 'A' code point ของมันคือ 0041
// ถ้าเก็บ 16 bit ก็จะได้
// 00000000 00101001  อันนี้เรียก Little Endian
// ซึ่งตัวเรื่อง performance เลยมี machine บางตัวจะเอา byte หลังขึ้นก่อนก็จะเป็น
// 00101001 00000000  อันนี้เรียก Big Endian
// แล้วจะรู้ได้ไงว่า อันไหนเป็น Big อันไหนเป็น Little?
// จึงเป็นที่มาของ Byte Order Mark
// คือ content จะต้อง Prefix ด้วย 
// FF FE ถ้าเป็น Little Endian
// FE FF ถ้าเป็น Big Endian
// อันนี้ถึงแม้จะไม่เจอจาก code ของเราเองแต่อาจจะไปเจอจาก file ของคนอื่น
// เช่น file ที่ save จาก notepad++ ของ window อาจจะมี BOM


// Correct Counting
// es6
// ง่ายสุด
Array.from("💩").length

// nodejs มี punny code lib
require('punycode').ucs2.decode('💩').length // 1

// Normalize
// ดู unicode 2 ตัวนี้มองด้วยตา ไม่ต่างกันเลย แต่ compare แล้วไม่เท่ากัน
"mañana" === "mañana"
// เพราะว่าถ้าเราแกะ unicode มันออกมาปรกฏว่าได้เป็น ใช้ web นี้แกะ https://mothereff.in/js-escapes#1ma%C3%B1ana%20man%CC%83ana
"ma\xF1ana" 
//กับ
"man\u0303ana"

// ซึ่งในความเป็นจริงมันควรเหมือนกัน และเราสามารถทำได้ด้วยการ normalize
// es6
"mañana".normalize() === "mañana".normalize()
// es5 ต้องใช้ polyfill unorm https://github.com/walling/unorm

// ยังมีอีกหลายอย่างที่ surpise เราเมื่อเราพยายาม support unicode ใน Javascript
// อย่างเช่นการ reverse หรือการ check ด้วย regex ซึ่งเป็น corner case มากๆ
// เลยไม่ขอ cover ทุกอย่างนะครับ แต่สามารถไปดูได้จาก reference เหล่านี้ครับ
// Talk
// Mathias Bynens: JavaScript ♥ Unicode: https://www.youtube.com/watch?v=zi0w7J7MCrk
// Blog
// Unicode in Javascript (อันนี้ดี กระชับและครอบคลุม): https://flaviocopes.com/javascript-unicode
// JavaScript has a Unicode problem: https://mathiasbynens.be/notes/javascript-unicode
// JavaScript’s internal character encoding: UCS-2 or UTF-16?: https://mathiasbynens.be/notes/javascript-encoding
// JavaScript character escape sequences: https://mathiasbynens.be/notes/javascript-escapes

// UTF8
// ถึงแม้ว่า Javascript จะเป็น ucs-2 หรือ utf-16 แต่ browser และ database ส่วนใหญ่รองรับเป็น utf8 นะครับ
// แต่ก็ไม่ต้องตกใจเพราะ browser รองรับปํญหาพวกนี้ค่อนข้างดีมาก
// และถ้าเราเขียนโค้ดต่อกับ database โดยใช้ library ดีๆ ก็ไม่ค่อยเจอปัญหาแล้วครับ

// ถ้าสนใจเรื่อง unicode encoding อื่นๆ สามารถศึกษาเพิ่มเติมได้จาก clip นี้นะครับ
// สำเนียงอินเดีย
// part-1: https://www.youtube.com/watch?v=B1Sf1IhA0j4
// part-2: https://www.youtube.com/watch?v=-oYfv794R9s
// part-3: https://www.youtube.com/watch?v=vLBtrd9Ar28﻿
// สำเนียง british
// อันนี้เรื่อง utf8 ครับ: https://www.youtube.com/watch?v=MijmeoH9LT4