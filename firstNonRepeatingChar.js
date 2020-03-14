/*
Given a string s consisting of small English letters, find and return the first instance of a non-repeating character in it. If there is no such character, return '_'.

input s = "abacabad"
output = "c"

"aaabcccdeeef" -> "b"
"abcbad" -> "c"
"abcabcabc" -> "_"

*/

const firstNonRepeatingChar = (s) => {
  const hashMap = {};
  for (let c of s) {
    if (hashMap[c]) {
      hashMap[c]++;
    } else {
      hashMap[c] = 1;
    }
  }
  for (let c of s) {
    if (hashMap[c] === 1) {
      return c;
    }
  }
  return "_";
}

console.log(firstNonRepeatingChar("aaabcccdeeef"));
console.log(firstNonRepeatingChar("abcbad"));
console.log(firstNonRepeatingChar("abcabcabc"));