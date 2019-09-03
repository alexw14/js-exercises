/* --- Closures --- */


// Example One
function a() {
  let grandpa = 'grandpa'
  return function b() {
    let father = 'father'
    return function c() {
      let son = 'son'
      return `${grandpa} ${father} ${son}`;
    }
  }
}
console.log(a()()()); // output grandpa father son


// Example Two
function callMeMaybe() {
  setTimeout(function () {
    console.log(callMe);
  }, 4000);
  const callMe = "Hi! I am now here";
}
console.log(callMeMaybe());
// The setTimeout gets sent to the web API world,
// then put on the callback queue,
// then the event loop pushes it back to the call stack.
// By that time, we already ran line 23. callMe has already been created and assigned.
// Because it sees there is an enclosing function that is using callMe, it will create a closure.


// Two benefits of Closures
// 1.) Memory efficient
// 2.) Encapsulation


// Example Three
const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log(i);
  }, 5000)
}
// outputs 4, 4, 4, 4

// We can use the let keyword to give the setTimeout function it's own block scope
for (let i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log(i)
  }, 5000)
}
// outputs 0, 1, 2, 3

// We can also use an IIFE
for (var i = 0; i < array.length; i++) {
  (function (closureI) {
    setTimeout(function () {
      console.log(closureI)
    }, 5000)
  })(i);
}
// outputs 0, 1, 2, 3