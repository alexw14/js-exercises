// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

function palindrome(str) {
  let reversed = str.split('').reverse().join('');
  return str === reversed;
}

module.exports = palindrome;

// Reverse string method
/*
function palindrome(str) {
  let reversed = str.split('').reverse().join('');
  return str === reversed;
}
*/

// Using array every method
/*
function palindrome(str) {
  return str.split('').every((char, i)=> {
    return char === str[str.length - i - 1];
  });
}
*/