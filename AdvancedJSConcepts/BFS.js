class Node {
  constructor(value){
      this.value = value;
      this.left = null;
      this.right = null;
  }
}
class BinarySearchTree {
  constructor(){
      this.root = null;
  }

  BFS() {
    let data = [];
    let queue = [];
    let node = this.root;
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

}