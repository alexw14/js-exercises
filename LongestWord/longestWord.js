/**
* Longest Word
*
* Write a function that returns the longest word in the passed sentence.
* If there are two or more words that are the same length, return
* the first word from the string with that length. Ignore punctuation
* and assume sentence will not be empty.
*
* Examples:
* longestWord("Hello there") === "Hello"
* longestWord("My name is Adam") === "name"
* longestWord("fun&!! time") === "time"
*/

const longestWord = (word) => {
  let wordSplit = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ');
  let longestWord = '';
  wordSplit.forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  })
  return longestWord;
}

console.log(longestWord("Hello there"));
console.log(longestWord("My name is Adam"));
console.log(longestWord("fun&!! time"));
