function flattenArray(arr) {
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(flattenArray(cur));
    } else {
      return acc.concat(cur);
    }
  }, []);
}

console.log(flattenArray([[1, 2], [4, 5, 6, [7, 8]], [[9, [10, 11]], 12, 13, [[[[14], [15, 16]]]]]]));