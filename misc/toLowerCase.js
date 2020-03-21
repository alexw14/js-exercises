/*
Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.
Do not use the JavaScript String toLowerCase() Method
*/

const toLowerCase = (str) => {
  let lowerCaseStr = '';
  for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) <= 90 && str.charCodeAt(i) >= 65 ) {
          lowerCaseStr += String.fromCharCode(str.charCodeAt(i) + 32);
      } else {
          lowerCaseStr += str[i];
      }
  }
  return lowerCaseStr;
};

console.log(toLowerCase('HeLLo WoRLd'));
