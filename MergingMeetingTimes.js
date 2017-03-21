/*
Your company built an in-house calendar tool called HiCal. You want to add 
a feature to see the times in a day when everyone is available. To do this, 
you’ll need to know when any team is having a meeting. In HiCal, a meeting 
is stored as a tuple of integers [start_time, end_time] . These integers 
represent the number of 30-minute blocks past 9:00am. For example:
    (2, 3) => meeting from 10:00 – 10:30 am 
    (6, 9) => meeting from 12:00 – 1:30 pm

Write a function condense_meeting_times() that takes an array of 
meeting time ranges and returns an array of condensed ranges. For example:
[[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]] => [[0, 1], [3, 8], [9, 12]]

Do not assume the meetings are in order. The meeting times are coming from 
multiple teams. In this case the possibilities for start_time and end_time 
are bounded by the number of 30-minute slots in a day. But soon you plan to 
refactor HiCal to store times as Unix timestamps (which are big numbers). 
Write something that's eﬃcient even when we can't put a nice upper bound on 
the numbers representing our time ranges.

Gotchas
Look at this case:
[[1, 2], [2, 3]]
These meetings should probably be merged, although they don't exactly 
"overlap"—they just "touch." Does your function do this?

Look at this case:
[[1, 5], [2, 3]]
Notice that although the second meeting starts later, it ends before the 
first meeting ends. Does your function correctly handle the case where a 
later meeting is "subsumed by" an earlier meeting?

Look at this case:
[[1, 10], [2, 6], [3, 5], [7,9]]
Here all of our meetings should be merged together into just (1,10). We 
need keep in mind that after we've merged the first two we're not done 
with the result—the result of that merge may itself need to be merged 
into other meetings as well. Make sure that your function won't "leave 
out" the last meeting.

We can do this in O(nlgn) time.
*/

const condenseMeetingTimes = mtgs => {
  mtgs.sort((a,b)=>a[0]-b[0])
  for (let i = mtgs.length-1; i > 0; i--) {
    if (mtgs[i][0] <= mtgs[i-1][1]) {
      if (mtgs[i][1] >= mtgs[i-1][1]) {
        mtgs[i-1][1] = mtgs[i][1]
      }
      mtgs.splice(i,1)
    }
    if (mtgs[i] && mtgs[i][1] <= mtgs[i-1][1]) {
      mtgs.splice(i,1)
    }
  }
  return mtgs
}

let test = condenseMeetingTimes([[0, 1], [4, 8], [10, 12], [9, 10]])
console.log(test)