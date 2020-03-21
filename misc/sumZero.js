/*
Given an integer n, return any array containing n unique integers such that they add up to 0.

Example 1:

Input: n = 5
Output: [-7,-1,1,3,4]
Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].
*/

const sumZero = (n) => {
  let sum = 0;
  for (let i = 0; i < n - 1; i++) {
    arr.push(i);
    sum += i;
  }
  arr.push((-1) * sum);
  return arr;
}


// const sumZero = (n) => {
//   const arr = [];
//   if (n % 2 !== 0) {
//     arr.push(0);
//     for (let i = 1; i <= Math.floor(n / 2); i++) {
//       arr.push(i);
//       arr.push(i * (-1));
//     }
//   } else {
//     for (let i = 1; i <= Math.floor(n / 2); i++) {
//       arr.push(i);
//       arr.push(i * (-1));
//     }
//   }
//   return arr;
// }
