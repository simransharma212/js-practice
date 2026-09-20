// Hoisting refers to the mechanism where the interpretor allocates memory for variable , 
// functions and class Declarations before existing the code
// Javascript me kya hota hai ke variables or declarations memory mein register kar leti hai code ko execute karne se pehle 
// Isliye kabhi-kabhi hum kisi variable/function ko declare karne se pehle use kar paate hain.

// Prob 1
// console.log(a);

var a = 10; 
// [Output will be undefined] because it is related to  

// JavaScript internally roughly is tarah treat ka 8rti hai:
// 👉 Declaration hoist hoti hai, assignment nahi.

// Prob 2
// console.log(a);

// let a = 10; 
// Reference error 
// let aur const ki declarations bhi hoist hoti hain, lekin unhe declaration se pehle access nahi kar sakte.

// Is period ko Temporal Dead Zone (TDZ) kehte hain.
// Functions ka hoisting thoda powerful hai.
// Kyunki function declaration completely hoist ho jaati hai.
// JavaScript function ko pehle se memory mein available kar deti hai.
sayHello();
function sayHello() {
    console.log("Hello");
}