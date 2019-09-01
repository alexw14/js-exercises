/* --- Execution Context --- */

const printName = () => {
  return 'Alex Wong';
}

const findName = () => {
  return printName();
}

const sayMyName = () => {
  return findName();
}

// console.log(sayMyName());

/* 
The call stack would look like this:

| printName()               |
| findName()                |
| sayMyName()               |
| Global Execution Context  |
-----------------------------

Global Execution Context creates a Global Object and the 'this' keyword
*/


/* --- Hoisting --- */

// Example One
console.log('Hoisting Example 1');

console.log(name);  // undefined
// variables are partially hoisted. When the code runs, it knows there is going to be a name variable, so it does 
// var name = undefined
console.log(print()); // hello world
// function declarations are fully hoisted. It makes space for it in memory
// function expressions are not hoisted
var name = 'Alex';
function print() {
  console.log('hello world');
};

// Example Two (Scope and Hoisting)
console.log('Hoisting example 2')

var favFood = 'pizza';

var foodThoughts = function () {
  console.log('Fav food is ' + favFood); // prints Fav food is undefined
  var favFood = 'sushi';
  console.log('New fav food is ' + favFood); // prints New fav food is sushi
}

console.log(foodThoughts());
// Because favFood is also defined inside the function, it does not look up to the global environment for favFood.


/* --- Function Scope vs Block Scope --- */

console.log('Scope Example');
// function scope
if (5 > 4) {
  var secret = '1234';
}
console.log(secret); // print 1234
// A new scope is created when there is a function
function secret() {
  var secret2 = '1234';
}
//console.log(secret2); // secret2 is not defined

// with ES6, using let and const keyword will create block scope
if (5 > 4) {
  let secret3 = '1234';
}
//console.log(secret3); // secret is not defined

console.log('Scope Example 2');

function varLoop() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('final ' + i);
}
// varLoop();
// prints 0,1,2,3,4,final 5

function letLoop() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('final ' + i);
}
// letLoop();
// Error, i is not defined in line 96.