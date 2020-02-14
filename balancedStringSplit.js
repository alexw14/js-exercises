/*
Balanced strings are those who have equal quantity of 'L' and 'R' characters.

Given a balanced string s split it in the maximum amount of balanced strings.

Return the maximum amount of splitted balanced strings.

Example 1:
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
*/

const balancedStringSplit = (s) => {
  let total = 0;
  let count = 0;
  for (let c of s) {
      if (c === "R") total++;
      if (c === "L") total--;
      if (total === 0) count++;
  }
  return count;
};