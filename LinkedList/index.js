// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    // const node = new Node(data, this.head);
    // this.head = node;
    // combine the two above lines
    this.head = new Node(data, this.head);
  }

  size() {
    let counter = 0;
    let node = this.head;
    while (node) {
      counter++;
      node = node.next;
    }
    return counter;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) return;
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  removeLast() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let node = this.head;
    let nextNode = node.next;
    while (nextNode.next) {
      node = node.next;
      nextNode = nextNode.next;
    }
    node.next = null;
  }

  insertLast(data) {
    let lastNode = this.getLast();
    if (lastNode) {
      lastNode.next = new Node(data);
    } else {
      this.head = new Node(data);
    }
  }

  getAt(n) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === n) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  removeAt(n) {
    if (!this.head) return;
    if (n === 0) {
      this.head = this.head.next;
      return;
    }
    let previousNode = this.getAt(n - 1);
    if (!previousNode || !previousNode.next) return;
    previousNode.next = previousNode.next.next;
  }

  insertAt(data, n) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }
    if (n === 0) {
      this.head = new Node(data, this.head);
      return;
    }
    let previousNode = this.getAt(n - 1);
    if (!previousNode || !previousNode.next) {
      this.insertLast(data);
      return;
    }
    previousNode.next = new Node(data, previousNode.next);
  }

}

module.exports = { Node, LinkedList };