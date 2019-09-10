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