/*
Given a string s, find the longest palindromic substring 
in s. You may assume that the maximum length of s is 1000.

Example:
  Input: "babad"
  Output: "bab"
  -- Note: "aba" is also a valid answer.

Example:
  Input: "cbbd"
  Output: "bb"

*/

const isPalindrome = str => {
  for (let i = Math.floor(str.length / 2); i < str.length; i++)
    if (str[i] !== str[str.length -1 - i])
      return false
  return true
}

const longestPalindrome = str => {
  let longPal = ''
  for (let i = 0; i < str.length; i++) {
    let j = 0
    while (isPalindrome(str.substring(i-j,i+j+1)) && i-j >= 0 && i+j < str.length) {
      if (longPal.length < str.substring(i-j,i+j+1).length) 
        longPal = str.substring(i-j,i+j+1)
      j++
    }
    j = 0;
    while (isPalindrome(str.substring(i-j, i+j+2)) && i-j >=0 && i+j+2 <= str.length) {
      if (longPal.length <= str.substring(i-j, i+j+2).length) 
        longPal = str.substring(i-j,i+j+2)
      j++
    }
  }
  return longPal
}