// Linear Search

// Write a function that accepts an array and a value
// Return the index of the array at which the value is found
// If the value is never found, return -1
function linearSearch(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6, 7, 1], 1));

// Array methods - indexOf, includes, find, findIndex
// They all use linear search

// Binary Search

// Binary search is a much faster form of search
// Eliminates half of the remaining elements at a time rather than one element at a time
// Only works on SORTED arrays!

// Write a function that accepts a SORTED array and a value
// Return the index of the array at which the value is found
// If the value is never found, return -1

function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left+right)/2);
    if (val === arr[mid]) {
      return mid;
    }
    if (val > arr[mid]) {
      left = mid + 1;
    }
    if (val < arr[mid]) {
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 2))