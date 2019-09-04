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
console.log(collectOdds([1,2,3,4,5,6,7,8,9]));

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
console.log(collectEvens([1,2,3,4,5,6,7,8,9]));