/*
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 

Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/

const lengthOfLongestSubstring = (s) => {
  let i = 0; // first pointer
  let j = 0; // second pointer
  let max = 0;
  const hashMap = {};

  while (j < s.length) {
    // if char is not in hashMap, add to it
    if (!hashMap[s.charAt(j)]) {
      hashMap[s.charAt(j)] = s.charAt(j);
      j++;
      max = Math.max(Object.keys(hashMap).length, max);
    } else {
      delete hashMap[s.charAt(i)];
      i++;
    }
  }

  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));