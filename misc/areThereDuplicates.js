/*
Write a function call areThereDuplicates which accepts a variable number of arguments and checks whether there are any duplicates among the arguments passed in.
*/

function areThereDuplicates() {
  let args = [...arguments];
  let obj = {};
  args.forEach(arg => {
    obj[arg] ? obj[arg] += 1 : obj[arg] = 1;
  });
  for (let key in obj) {
    if (obj[key] > 1) return true;
  }
  return false;
}

console.log(areThereDuplicates(1, 2, 3));
console.log(areThereDuplicates(1, 2, 2));
console.log(areThereDuplicates('a', 'b', 'c', 'a'));