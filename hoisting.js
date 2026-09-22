// Hoisting refers to the mechanism where the interpretor allocates memory for variable , 
// functions and class Declarations before existing the code
// Javascript me kya hota hai ke variables or declarations memory mein register kar leti hai code ko execute karne se pehle 
// Isliye kabhi-kabhi hum kisi variable/function ko declare karne se pehle use kar paate hain.

// Prob 1
console.log(a);

var a = 10; 
// [Output will be undefined] because it is related to  

// JavaScript internally roughly is tarah treat ka 8rti hai:
// 👉 Declaration hoist hoti hai, assignment nahi.

// Prob 2
console.log(a);

let a = 10; 
// Reference error 
// let aur const ki declarations bhi hoist hoti hain, lekin unhe declaration se pehle access nahi kar sakte.
// Is period ko Temporal Dead Zone (TDZ) kehte hain.

// Prob 3
// Functions ka hoisting thoda powerful hai.
// Kyunki function declaration completely hoist ho jaati hai.
// JavaScript function ko pehle se memory mein available kar deti hai.
sayHello();
function sayHello() {
    console.log("Hello");
}

// Prob 4
console.log(a);
var a = 10;
console.log(a);
// [Output will be undefined and 10]

// Prob 5 

var a = 10;

function test() {
    console.log(a); //undefined
    var a = 20;
    console.log(a); //20
}

test();

//  Prob 6 
var a = 10;

function test() {
    console.log(a); //ReferenceError: Cannot access 'a' before initialization
    
    let a = 20;
}

test();

// Prob 7
var x = 1;

function test() {
    console.log(x); // undefined 

    if (true) {
        var x = 2;
    }

    console.log(x); //2
}

test();

// Prob 8
let x = 10;
{
    console.log(x);
    let x = 20;
}

// Prob 9
console.log(foo);  // Output will be Function: Foo 

var foo = 10;

function foo() {
    console.log("hi");
}

console.log(foo); // Output will be 10

// Prob 10 
foo();

var foo = function () {
    console.log("A");
};

function foo() {
    console.log("B");
}

// function foo will call first

// Prob 11 
// Nested scope
let a = 10;

function outer() {
    let a = 20;

    function inner() {
        let a = 30;
        console.log(a); //30
    }

    inner();
    console.log(a); //20
}

outer();

console.log(a); //10

// Prob 12
let x = "global";

function outer() {
    let x = "outer";
// Due to its lexical scope
    function inner() {
        console.log(x); //outer
    }

    inner();
}

outer();

// // Prob 13 
function outer() {
    
    let count = 0; // if it placed here only it will give 1 2 3
    return function () {
        //  if let count = 0 it will give 1 1 1 //Reason: count ab har counter() call par dobara create ho raha hai.0
        count++;
        console.log(count);
    };
}

const counter = outer();

counter();
counter();
counter();
// [123]
// Counter 1 ka role 
//  ye returned function counter mein store ho jata hai.

// count delete nahi hota, even though outer() ka execution complete ho gaya.
// Kyun?
// Because returned function ko count ki zarurat hai. Isliye JavaScript closure ke through count ko remember rakhta hai.

// Counter 2 ka role 
// Important: ye outer() ko dobara call nahi kar raha.
// Ye wahi returned function call kar raha hai.
// Aur us function ke paas wahi count hai:

// So simply outer() sirf ek baar call hua hai:
// Lekin counter ke andar returned function hai, aur returned function ko count variable yaad hai.
// Isko closure kehte hain.
// Visualize karo: 
// outer()
//   │
//   ├── count = 0
//   │
//   └── returns function
//           │
//           │ remembers count
//           ↓
//        counter
//           │
//           ├── counter() → count 1
//           │
//           ├── counter() → count 2
//           │
//           └── counter() → count 3
// A closure is created when an inner function remembers and retains access to variables from its outer function's lexical scope 
// even after the outer function has finished executing.

// Prob 14 
function outer() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const counter1 = outer();
const counter2 = outer();

counter1();
counter1();

counter2();
counter2();

// Output will be 1212
// Dono ke paas alag lexical environment / alag count hai.
//              outer()
//             /       \
//            /         \
//           ↓           ↓
//      counter1      counter2
//         │              │
//         ↓              ↓
//    count = 0       count = 0

// const counter1 = outer();
// const counter2 = counter1;
// Yahan counter1 aur counter2 same count share karenge,
//  because dono same returned function / same closure ko point kar rahe hain.


// outer() twice → separate closures → separate count

// Same returned function ko 2 variables mein assign → same closure → same count.

// Prob 15
for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
} 
//[333] for var
//[012] //for let

// Prob 16
function createFunctions() {
    const functions = [];

    for (let i = 0; i < 3; i++) {
        functions.push(function () {
            return i;
        });
    }

    return functions;
}

const funcs = createFunctions();

console.log(funcs[0]());
console.log(funcs[1]());
console.log(funcs[2]());
// Because let is block-scoped and creates a new binding of i for each iteration of the loop. 
// Each function forms a closure over its iteration's i, so the first function remembers 0, 
// the second remembers 1, and the third remembers 2.

// let  → new binding per iteration → 0 1 2
// var  → same binding → 3 3 3

// Prob 17
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
// ACB

// Prob 18
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
// ADCB 

// Promise 19
console.log("1");

Promise.resolve().then(() => {
    console.log("2");
});

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
// 1423

// Prob 20
function test() {
    let x = 10;

    setTimeout(() => {
        console.log(x);
    }, 0);

    x = 20;
}

test();

// Prob 21
var x = 1;

function test() {
    console.log(x); //undefined

    var x = 2;

    setTimeout(() => {
        console.log(x); 1
    }, 0);

    x = 3;

    Promise.resolve().then(() => {
        console.log(x); //3
    });
}

test();

console.log(x); //3
// setTimeout aur Promise callback x ki value us waqt nahi lete jab callback create hota hai. 
// Closure ki wajah se woh variable ko access karte hain jab callback actually execute hota hai.