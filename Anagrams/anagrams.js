/**
 * Anagrams
 *
 * Return true or false depends on provided strings are anagrams of eachother.
 * An anagram is a word or phrase formed by rearranging the letters of a 
 * different word or phrase, typically using all the original letters exactly
 * once. One string is an anagram of another if it uses the same characters
 * in the same quantity. Only consider characters, not spaces
 * or punctuation. Consider capital letters to be the same as lower case.
 *
 * Examples:
 * anagrams('rail safety', 'fairy tales') === true
 * anagrams('RAIL! SAFETY!', 'fairy tales') === true
 * anagrams('Hi there', 'Bye there') === false
 */

const findAnagrams = (firstString, secondString) => {
  let firstWord = firstString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  firstWord = firstWord.replace(/\s/g, '').toLowerCase();
  firstWord = firstWord.split('').sort().join('');
  let secondWord = secondString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  secondWord = secondWord.replace(/\s/g, '').toLowerCase();
  secondWord = secondWord.split('').sort().join('');
  return firstWord === secondWord;
};

console.log(findAnagrams('rail safety', 'fairy tales'));
console.log(findAnagrams('RAIL! SAFETY!', 'fairy tales'));
console.log(findAnagrams('Hi there', 'Bye there'));
