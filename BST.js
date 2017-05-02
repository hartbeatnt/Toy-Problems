/**
 * Write a method for in-order traversal of a Binary Search Tree.
 * Then write a method to validate a Binary Search Tree
 */

class BST {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  insert(val) {
    if (val <= this.value) {
      if (this.left) this.left.insert(val)
      else return this.left = new BST(val)
    } else {
      if (this.right) this.right.insert(val)
      else return this.right = new BST(val)
    }
  }
  inOrderTraverse(callback) {
    this.left && this.left.inOrderTraverse(callback);
    callback(this);
    this.right && this.right.inOrderTraverse(callback);
  }
  validate() {
    let valid = true;
    let prev = null;
    this.inOrderTraverse((node)=>{
      if (!prev) return prev = node.value;
      if (prev > node.value) return valid = false;
      return prev = node.value;
    })
    return valid;
  }
}

/**
 * Tests
 */
const assert = (expect, describe) => expect
  ? console.log('Test Passed:', describe)
  : console.error('Test Failed:', describe)

let BST1 = new BST(4)
BST1.left = new BST(2)
BST1.right = new BST(6)
BST1.left.left = new BST(1)
BST1.left.right = new BST(3)
BST1.right.right = new BST(7)
BST1.right.left = new BST(5)

let sorted = []
let pushToSorted = node => sorted.push(node.value)
BST1.inOrderTraverse(pushToSorted)

assert(
  [1,2,3,4,5,6,7].every((val,i) => val === sorted[i]),
  'inOrderTraverse should execute callback on every node in order'
)
assert(
  BST1.validate() === true, 
  'validate should return true for valid BST'
)

let BST2 = new BST(4)
BST2.left = new BST(2)
BST2.right = new BST(6)
BST2.left.left = new BST(1)
BST2.left.right = new BST(5)
BST2.right.right = new BST(7)
BST2.right.left = new BST(5)

assert(
  BST2.validate() === false, 
  'validate should return false for invalid BST'
)

let BST3 = new BST(4)
BST3.insert(1)
BST3.insert(2)
BST3.insert(3)
BST3.insert(5)
BST3.insert(6)
BST3.insert(7)

assert(
  BST3.validate(), 
  'insert should place new nodes in the proper position'
)