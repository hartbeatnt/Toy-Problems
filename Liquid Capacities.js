/*
You are given 3 glasses with their respective capacities (volumes) stored in an array cap. 
It is possible to perform either of the two following operations to the glasses:

    empty one of the glasses entirely;
    pour water from one glass into another until either the first one is empty or the second one is full.

Initially all the glasses are full (i.e. for each valid i the ith glass has cap[i] units of water). How 
many different positive volumes of the total amount of water in all the glasses is it possible to get 
performing an arbitrary number of described actions?

Example

    For cap = [1, 1, 1], the output should be
    threeGlasses(cap) = 3.

Initially there are 3 units of water in all the glasses. The only action you can perform is to empty 
the water from one of the glasses, which will leave you with 2 units. At this point, pouring water 
from one glass to another won't produce a different total amount of water, so the only remaining 
option is emptying one of the remaining glasses, which will leave you with 1 final unit of water. 
Thus, it is possible to obtain 1, 2 or 3 units of water, so the answer is 3.

    For cap = [16, 5, 3], the output should be
    threeGlasses(cap) = 21.

Here is the list of all possible amounts of water across all three glasses: 
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24.
*/


function threeGlasses(cap) {
  const Cup = function(max, cur) {
    this.maxVol = max;
    this.curVol = cur || cur === 0 ? cur : max;
  }
  const CupSet = function(maxVolArray, curVolArray) {
    if (!curVolArray)
      this.cups = maxVolArray.map(vol=>new Cup(vol))
    else {
      this.cups = maxVolArray.map((vol,i)=>new Cup(vol, curVolArray[i]))
    }
  }

  CupSet.prototype.getCurVols = function() {
    return this.cups.map(cup=>cup.curVol)
  }

  CupSet.prototype.getMaxVols = function() {
    return this.cups.map(cup=>cup.maxVol)
  }

  CupSet.prototype.totalVol = function() {
    return this.cups.reduce((a,b)=>a+b.curVol,0)
  }

  CupSet.prototype.pour = function(i1, i2) {
    if (!i2 && i2 !== 0) {
      this.cups[i1] = new Cup(this.cups[i1].maxVol, 0)
    } else {
      let cup1cur = this.cups[i1].curVol;
      let cup1max = this.cups[i1].maxVol;
      let cup2cur = this.cups[i2].curVol;
      let cup2max = this.cups[i2].maxVol;
      while (cup1cur > 0 && cup2cur < cup2max) {
        cup1cur--;
        cup2cur++;        
      }
      this.cups[i1] = new Cup(cup1max, cup1cur)
      this.cups[i2] = new Cup(cup2max, cup2cur)
    }
  }

  let results = {};

  const recurse = cups => {
    let used = JSON.stringify(cups.getCurVols());
    if (results[used] || results[used]===0) return;
    results[used] = cups.totalVol();
    cups.cups.forEach((cup,i)=> {
      let newCups1 = new CupSet(cups.getMaxVols(), cups.getCurVols())
      let newCups2 = new CupSet(cups.getMaxVols(), cups.getCurVols())
      let newCups3 = new CupSet(cups.getMaxVols(), cups.getCurVols())
      newCups1.pour(i)
      newCups2.cups[i+1] 
        ? newCups2.pour(i, i+1)
        : newCups2.pour(i, 0)
      newCups3.cups[i+2]
        ? newCups3.pour(i, i+2)
        : newCups3.pour(i, i-1)
      recurse(newCups1)
      recurse(newCups2)
      recurse(newCups3)
    })
  }

  let cups = new CupSet(cap)
  recurse(cups)

  // the return statement could be optimized by uzing a lookup
  // object to find duplicates rather than using the indexOf method
  return( 
    Object
    .keys(results)
    .map(key=>results[key])
    .filter((v,i,a)=>a.indexOf(v)===i)
    .sort((a,b)=>a-b)
    .length-1
  )
}

console.log(threeGlasses([16,5,3]))
