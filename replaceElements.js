/*
Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
*/

const replaceElements = (arr) => {

  const outputArr = [-1];
  let tempMax = arr[arr.length - 1];

  for (let i = arr.length - 2; i >= 0; i--) {
    outputArr.push(tempMax);
    if (arr[i] > tempMax) tempMax = arr[i];
  }

  return outputArr.reverse();

};