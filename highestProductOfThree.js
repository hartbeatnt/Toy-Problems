/*
Given an array_of_ints, ﬁnd the highest_product 
you can get from three of the integers.
The input array_of_ints will always have at 
least three integers.

Gotchas
Does your function work with negative numbers? 
If array_of_ints is [−10,−10,1,3,2] we should 
return 300 (which we get by taking −10∗−10∗3).

We can do this in O(n) time and O(1) space.
*/

const highestProductOfThree = arr => {
  let big = 0;
  let bigger = 0; 
  let biggest = 0;
  let small = 0;
  let smaller = 0;
  arr.forEach(num=>{
    if (num > biggest) {
      big = bigger;
      bigger = biggest;
      biggest = num;
    } else if (num > bigger) {
      big = bigger;
      bigger = num;
    } else if (num > big) {
      big = num;
    } else if (num < smaller) {
      small = smaller;
      smaller = num;
    } else if (num < small) {
      small = num;
    }
  })
  return Math.max(big*bigger*biggest, small*smaller*biggest)
}

let test = highestProductOfThree([1,2,3,4,5])
console.log(test)