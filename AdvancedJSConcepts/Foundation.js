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
console.log('1 ----------');

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
console.log('2 ----------')

var favFood = 'pizza';

var foodThoughts = function () {
  console.log('Fav food is ' + favFood); // prints Fav food is undefined
  var favFood = 'sushi';
  console.log('New fav food is ' + favFood); // prints New fav food is sushi
}

console.log(foodThoughts());
// Because favFood is also defined inside the function, it does not look up to the global environment for favFood.
