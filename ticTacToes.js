/*
Implement Tic-Tac-Toe in the console.
*/

var a1='a1'
var a2='a2'
var a3='a3'
var b1='b1'
var b2='b2'
var b3='b3'
var c1='c1'
var c2='c2'
var c3='c3'

var board = {
  a: {
    1: '  ',
    2: '  ',
    3: '  '
  },
  b: {
    1: '  ',
    2: '  ',
    3: '  '
  },
  c: {
    1: '  ',
    2: '  ',
    3: '  '
  }
}
var player = 'X';

var printBoard = ()=> {
  console.log(
  `
  ${board.a[1]}|${board.a[2]}|${board.a[3]}
  --------
  ${board.b[1]}|${board.b[2]}|${board.b[3]}
  --------
  ${board.c[1]}|${board.c[2]}|${board.c[3]}
  `  
  )
  return `your turn, ${player}`
}
var placePiece = (square) => {
  square = square.toLowerCase();
  if (square.length !== 2 ||
      !['a','b','c'].includes(square[0]) ||
      !['1','2','3'].includes(square[1]) ||
      board[square[0]][square[1]] !== "  "
     ) return "invalid square! try again";
  board[square[0]][square[1]] = player.concat(' ')
  printBoard();
  if (winCheck(square, player)) return `${player} wins!`
  player = player === 'X' ? 'O' : 'X'
  return `your turn, ${player}`
  
}
var winCheck = (square, player) => {
  let row = [board[square[0]][1],board[square[0]][3],board[square[0]][3]];
  let col = [board.a[square[1]],board.b[square[1]],board.c[square[1]]];
  let majD = [board.a[1],board.b[2],board.c[3]];
  let minD = [board.a[3],board.b[2],board.c[3]];
  if (row.every(sq=>sq===player+' ')) return true;
  if (col.every(sq=>sq===player+' ')) return true;
  if (majD.every(sq=>sq===player+' ')) return true;
  if (minD.every(sq=>sq===player+' ')) return true;
  return false;
}
console.log('to play, call placePiece()\nwith a grid space(a1->c3) as argument.')
printBoard()
