/*
implement connect 4 in the console
*/

const Board = function(){
  for (let i = 0; i < 7; i++) {
    this[i] = new Array(6).fill('X')
  }
}