// --- Directions
// Given the root node of a tree, return
// an array where each element is the width
// of the tree at each level.
// --- Example
// Given:
//     0
//   / |  \
// 1   2   3
// |       |
// 4       5
// Answer: [1, 3, 2]

function levelWidth(root) {
  let counters = [0];
  let arr = [];
  arr.push(root);
  let stopper = 's';
  arr.push(stopper);
  while (arr.length > 1) {
    let node = arr.shift();
    if (node === stopper) {
      arr.push(stopper);
      counters.push(0);
    } else {
      arr.push(...node.children);
      counters[counters.length - 1] += 1;
    }
  }
  return counters;
}

module.exports = levelWidth;