// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  return str.split('').reduce((reverseString, char) => {
    return char + reverseString;
  }, '');
}

module.exports = reverse;

// Using array reverse method
/*
function reverse(str) {
  const arr = str.split('');
  arr.reverse();
  return arr.join('');
  // OR
  // return str.split('').reverse().join('');
}
*/

// Using for loop
/*
function reverse(str) {
  let reverseString = '';
  for (let char of str) {
    reverseString = char + reverseString;
  }
  return reverseString;
}
*/

// Using array reduce method
/*
function reverse(str) {
  return str.split('').reduce((reverseString, char) => {
    return char + reverseString;
  }, '');
}
*/