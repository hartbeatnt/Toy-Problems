/*
You are given two non-empty linked lists representing two 
non-negative integers. The digits are stored in reverse 
order and each of their nodes contain a single digit. Add 
the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading 
zero, except the number 0 itself.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carryOver = 0;
    let sum = l1.val + l2.val;
    if (sum > 9) {
        sum -= 10;
        carryOver = 1;
    }
    let result = new ListNode(sum);
    const addNodes = (n1, n2, output, carryOver) => {
      if (!n1 && !n2) {
          if (!carryOver) return;
          else output.next = new ListNode(carryOver)
      }
      if (!n1) n1 = new ListNode(0);
      if (!n2) n2 = new ListNode(0);
      let sum = n1.val + n2.val + carryOver;
      let overflow = false;
      if (sum > 9) {
        sum -= 10;
        overflow = true;
      }
      output.next = new ListNode(sum)
      if (n1.next || n2.next || overflow) {
        addNodes(n1.next, n2.next, output.next, overflow ? 1: 0)
      }
    }
    addNodes(l1.next, l2.next, result, carryOver)
    return result;
};