/**
 * Vowels
 *
 * Write a function which returns number of vowels in given string.
 *
 * Examples:
 * vowels('aeiou') === 5
 * vowels('Adam') === 2
 * vowels('Hello there!') === 4
 */

const findVowels = (string) => {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  let splitString = string.toLowerCase().split('');
  let count = 0;
  splitString.forEach(char => {
    if (vowels.includes(char)) {
      count += 1;
    }
  })
  return count;

}

console.log(findVowels('aeiou'));
console.log(findVowels('Adam'));
console.log(findVowels('Hello there!'));