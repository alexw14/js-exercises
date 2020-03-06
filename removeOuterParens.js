/*
Example 1:

Input: "(()())(())"
Output: "()()()"
Explanation: 
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".

Example 2:

Input: "(()())(())(()(()))"
Output: "()()()()(())"
Explanation: 
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".

Example 3:

Input: "()()"
Output: ""
Explanation: 
The input string is "()()", with primitive decomposition "()" + "()".
After removing outer parentheses of each part, this is "" + "" = "".
*/

var removeOuterParentheses = function (S) {
  let arr = [];
  let found = false;
  let balanced = 0;

  for (let p of S) {
    if (p === "(") {
      if (!found && balanced === 0) {
        found = true;
        balanced++;

      } else if (found) {
        arr.push(p);
        balanced++;
      }
    }
    if (p === ")") {
      if (found && balanced !== 1) {
        arr.push(p);
        balanced--;
      } else if (found && balanced === 1) {
        found = false;
        balanced--;
      }
    }
  }
  return arr.join('')
};