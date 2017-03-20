/*
I have an array stock_prices_yesterday where:
The indices are the time in minutes past trade opening time, which was
9:30am local time. The values are the price in dollars of Apple stock at that time.
For example, the stock cost $500 at 10:30am, so stock_prices_yesterday[60] = 500.

Write an efficient algorithm for computing the best profit I could have made from
1 purchase and 1 sale of 1 Apple stock yesterday.
No "shorting"—you must buy before you sell. You may not buy and sell in the same
time step (at least 1 minute must pass).

It is not sufficient to simply take the difference between the highest price and the lowest
price, because the highest price may come before the lowest price. You must buy before you sell.
What if the stock value goes down all day? In that case, the best profit will be negative.
You can do this in O(n) time and O(1) space!
*/

const getMaxProfit = prices => {
  if (prices.length < 2) {
    return "price array must include at least two elements"
  }
  let minPrice = prices[0]
  let maxProfit = prices[1] - prices[0]
  prices.forEach(price=>{
    if (price < minPrice) minPrice = price;
    else {
      let profit = price - minPrice;
      if (profit > maxProfit) maxProfit = profit;
    }
  })
  return maxProfit
}

let test = getMaxProfit([0,2,9,1,6,10])
console.log(test)