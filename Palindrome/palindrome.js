/**
 * Palindrome
 *
 * For given string return true if the string is a palindrome
 * or false if it is not.
 *
 * Palindromes are strings that form the same word if it is reversed.
 * Include spaces and punctuation in determining if the string
 * is a palindrome.
 *
 * Examples:
 * palindrome("abba") === true
 * palindrome("abcdefg") === false
 * palindrome(“race car”) === true
 * palindrome(“not a palindrome”) === false
 * palindrome(“A man, a plan, a canal. Panama”) === true
 * palindrome(“never odd or even”) === true
 * palindrome(“nope”) === false
 * palindrome(“almostomla”) === false
 * palindrome(“My age is 0, 0 si ega ym.”) === true
 * palindrome(“1 eye for of 1 eye.”) === false
 * palindrome(“0_0 (: /-\ :) 0–0”) === true
 */

 const findPalinrome = (string) => {
  // use regular expression to remove unwanted characters
  let remove = /[^A-Za-z0-9]/g;

  let newString = string.toLowerCase().replace(remove, '');
  // reverse the new string
  let reverseNewString = newString.split('').reverse().join(''); 

  return newString === reverseNewString;
 }

 console.log(findPalinrome("abba"));
 console.log(findPalinrome("abcdefg"));
 console.log(findPalinrome("race car"));
 console.log(findPalinrome("not a palindrome"));
 console.log(findPalinrome("A man, a plan, a canal. Panama"));
 console.log(findPalinrome("never odd or even"));
 console.log(findPalinrome("nope"));
 console.log(findPalinrome("almostomla"));
 console.log(findPalinrome("My age is 0, 0 si ega ym."));
 console.log(findPalinrome("1 eye for of 1 eye."));
 console.log(findPalinrome("0_0 (: /-\ :) 0–0"));