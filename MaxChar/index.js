// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  const dictionary = {};
  let max = 0;
  let maxChar = '';
  for (let char of str) {
    dictionary[char] ? dictionary[char]++ : dictionary[char] = 1;
  }
  for (let key in dictionary) {
    if (dictionary[key] > max) {
      max = dictionary[key];
      maxChar = key;
    }
  }
  return maxChar;
}

module.exports = maxChar;