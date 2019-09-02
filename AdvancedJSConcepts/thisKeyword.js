// 'this' is the object that the function is a property of

// Why 'this' keyword was created
// 1: Gives methods access to their object
// 2: Execute same code for multiple objects

// Example One
const obj = {
  name: 'Alex',
  sing: function () {
    return 'lalala ' + this.name;
  },
  singAgain: function () {
    return this.sing() + '!';
  }
}
console.log(obj.sing()); // prints lalala Alex
// We can update the sing method, which will also update the singAgain method, making our code DRY.

// Example Two
function importantPerson() {
  return this.name;
}
const obj1 = {
  name: 'Cassy',
  importantPerson: importantPerson
}
const obj2 = {
  name: 'Don',
  importantPerson: importantPerson
}
console.log(obj1.importantPerson()); // print Cassy
console.log(obj2.importantPerson()); // print Don
// Execute same code for multiple objects

// Example Three
const obj4 = {
  name: 'Alex',
  print: function () {
    console.log('a', this);
    var innerFunc = function () {
      console.log('b', this)
    }
    innerFunc();
  }
}
console.log(obj4.print());
/*
a { name: 'Alex', print: [Function: print] }
b Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(util.promisify.custom)]: [Function]
  }
}
*/

// We can fix this with arrow function
// Arrow functions are lexically bound, i.e. arrow function has a lexical "this" behavior
const obj5 = {
  name: 'Alex',
  print: function () {
    console.log('a', this);
    var innerFunc = () => {
      console.log('b', this)
    }
    innerFunc();
  }
}
console.log(obj5.print());
/*
a { name: 'Alex', print: [Function: print] }
b { name: 'Alex', print: [Function: print] }
*/


/*--- call(), apply(), bind() ---*/

const wizard = {
  name: 'Merlin',
  health: 100,
  heal() {
    return this.health = 100;
  },
  superHeal(hp1, hp2) {
    return this.health += hp1 + hp2;
  }
}

const archer = {
  name: 'Robin',
  health: 30
}

// we can use call and apply to borrow methods
console.log('1', archer); // 1 { name: 'Robin', health: 30 }

// calls a method of an object, substituting another object for the current object
wizard.heal.call(archer);
console.log('2', archer); // 2 { name: 'Robin', health: 100 }

// we can also use call and pass in arguments
wizard.superHeal.call(archer, 50, 100);
console.log('3', archer); // 3 { name: 'Robin', health: 250 }

// with apply(), it just takes an array of parameters
wizard.superHeal.apply(archer, [20, 30]);
console.log('4', archer); // 4 { name: 'Robin', health: 300 }

// call() takes comma separated list of arguments
// apply() takes an array of parameters
// choosing between call() and apply(), it just depends which one is easier to pass the arguments in
// Note: the method borrowed must have the 'this' keyword

// bind() doesnt run a function like call() and apply()
// instead, it returns a new function
const healArcher = wizard.superHeal.bind(archer, 10, 20);
healArcher();
console.log('5', archer); // 5 { name: 'Robin', health: 330 }

// call and apply are useful for borrowing methods from an object
// bind is useful for us to call function later on with certain context, or 'this' keyword


// bind() and currying
function multiply(a, b) {
  return a*b;
}

let multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4)); // returns 8

let multiplyByTen = multiply.bind(this, 10);
console.log(multiplyByTen(4)); // returns 40
// Reuse a piece of code, give it a partial parameter
// Create functions that are extensible
// Turn a function which takes 2 parameters into a new function that only takes 1 parameter.