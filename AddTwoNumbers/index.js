/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/


// Definition for singly-linked list.
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function addTwoNumbers(l1, l2) {
  let node = new ListNode(0);
  let head = node;
  let carry = 0;
  let sum = 0;
  while (l1 !== null || l2 !== null) {
    let p = 0;
    let q = 0;
    if (l1 !== null) p = l1.val;
    if (l2 !== null) q = l2.val;
    sum = p + q + carry;
    carry = Math.floor(sum / 10);
    let newNode = new ListNode(sum % 10);
    node.next = newNode;
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
    node = node.next;
  }
  if (carry > 0) {
    let newNode = new ListNode(1);
    node.next = newNode;
  }
  return head.next;
};

const list1 = new ListNode(2);
list1.next = new ListNode(4);
list1.next.next = new ListNode(3);
const list2 = new ListNode(5);
list2.next = new ListNode(6);
list2.next.next = new ListNode(4);

console.log(addTwoNumbers(list1, list2));
