/*
Given an array arr that contains only numbers in the range from 1 to arr.length, find the first duplicate number for which the second occurence has the minimal index. In other words, if there are more than 1 duplicated numbers, return the number for which the second occurence has a smaller index than the second occurence of the other number does. If there are no such elements, return -1.

[1, 2, 1, 2, 3, 3] -> 1
[2, 1, 3, 5, 3, 2] -> 3
[1, 2, 3, 4, 5, 6] -> -1

*/


// const firstDuplicate = (arr) => {
//   const seen = {};
//   for (let i = 0; i < arr.length; i++) {
//     if (seen[arr[i]]) {
//       return arr[i];
//     } else {
//       seen[arr[i]] = arr[i];
//     }
//   }
//   return -1;
// }


const firstDuplicate = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[Math.abs(arr[i]) - 1] < 0) {
      return Math.abs(arr[i]);
    } else {
      arr[Math.abs(arr[i]) - 1] = -arr[Math.abs(arr[i]) - 1];
    }
  }
  return -1;
}

console.log(firstDuplicate([1, 2, 1, 2, 3, 3]));
console.log(firstDuplicate([2, 1, 3, 5, 3, 2]));
console.log(firstDuplicate([1, 2, 3, 4, 5, 6]));

