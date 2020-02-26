/*
International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows: "a" maps to ".-", "b" maps to "-...", "c" maps to "-.-.", and so on.

For convenience, the full table for the 26 letters of the English alphabet is given below:

[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
Now, given a list of words, each word can be written as a concatenation of the Morse code of each letter. For example, "cba" can be written as "-.-..--...", (which is the concatenation "-.-." + "-..." + ".-"). We'll call such a concatenation, the transformation of a word.

Return the number of different transformations among all words we have.

Example:
Input: words = ["gin", "zen", "gig", "msg"]
Output: 2
Explanation: 
The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."

There are 2 different transformations, "--...-." and "--...--.".
*/

const morseCode = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];

var uniqueMorseRepresentations = function(words) {
  const morseCodeMap = buildMap(morseCode);
  const map = {};
  for (let i = 0; i < words.length; i++) {
      let tempArr = words[i].split('');
      let tempStr = '';
      tempArr.forEach(letter => {
          tempStr += morseCodeMap[letter];
      });
      if (map[tempStr]) {
          map[tempStr]++;
      } else {
          map[tempStr] = 1;
      }
  }
  return Object.keys(map).length;
};

const buildMap = (arr) => {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
      map[String.fromCharCode(97+i)] = arr[i];
  }
  return map;
};
