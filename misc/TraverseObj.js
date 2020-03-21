const obj = {
  first: { second: { third: 'correct' } },
  hello: { world: { foo: { bar: 'wrong' } } },
  second: { third: 'wrong' }
};

const arr = ['first', 'second', 'third'];

function traverse(obj, arr) {
  let ref = obj;
  let last = arr[arr.length - 1];
  for (let i = 0; i < arr.length - 1; i++) {
    let key = arr[i];
    if (typeof ref[key] === 'object') {
      ref = ref[key];
    } else {
      return undefined;
    }
  }
  return ref[last];
}

console.log(traverse(obj, arr));

// function traverse(obj, arr) {
//   return arr.reduce((acc, curr) => acc ? acc[curr] : undefined, obj);
// }