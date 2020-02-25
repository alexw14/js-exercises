function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}
console.log(sumRange(10)) // 55

// Factorial Recursively
function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}
console.log(factorial(4));

// Helper method recursion
function collectOdds(arr) {
  let result = [];
  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0])
    }
    helper(helperInput.slice(1));
  }
  helper(arr);
  return result;
}
console.log(collectOdds([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// Pure Recursion
function collectEvens(arr) {
  let newArr = [];
  if (arr.length === 0) {
    return newArr;
  }
  if (arr[0] % 2 === 0) {
    newArr.push(arr[0]);
  }
  newArr = newArr.concat(collectEvens(arr.slice(1)));
  return newArr;
}
console.log(collectEvens([1, 2, 3, 4, 5, 6, 7, 8, 9]));

/*
Write a function called power which accepts a base and an exponent. The function should return the power of the base to the exponent. The function should mimic the functionality of Math.pow() - do not worry about negative bases and exponents.
// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
*/
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}
console.log(power(2, 4));

/*
Write a function called productOfArray which takes in an array of numbers and returns the product of them all.
// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60
*/
function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}

/*
Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function.
// recursiveRange(6) // 21
// recursiveRange(10) // 55
*/
function recursiveRange(num) {
  if (num === 0) return 0;
  return num + recursiveRange(num - 1);
}

