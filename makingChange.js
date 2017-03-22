/*
Imagine you landed a new job as a cashier...

Write a function that, given:
1. an amount of money 
2. a list of coin denominations

computes the number of ways to make the amount of money 
with coins of the available denominations.
Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), 
your program would output 4—the number of ways to make 4¢ with those denominations:
1. 1¢, 1¢, 1¢, 1¢ 
2. 1¢, 1¢, 2¢ 
3. 1¢, 3¢ 
4. 2¢, 2¢

Gotchas
We can do this in O(n ∗ m) time and O(n) space, where n is 
the amount of money and m is the number of denominations.

A simple recursive approach works, but you'll find that your function 
gets called more than once with the same inputs. We can do better.

We could avoid the duplicate function calls by memoizing, 
but there's a cleaner bottom-up approach.
*/

const makeChange = (sum, coins) => {
  
}