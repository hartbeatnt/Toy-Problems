/*
implement connect 4 in the console
*/

const Board = function(){
  this.cols = [];
  for (let i = 0; i < 7; i++) {
    this.cols[i] = new Array(6).fill(null)
  }
  this.winner = null;
  this.turn = Math.random() > 0.5 ?
    'X' : 'O';
}

Board.prototype.placePiece = function(col) {
  if (!this.cols[col]) return 'invalid move. Try again'
  let placed = false;
  this.cols[col].forEach((cell, i)=>{
    if (!cell && !placed) {
      this.cols[col][i] = this.turn;
      placed = true;
      this.winCheck(i, this.cols[col])
    }
  })
  if (!placed) return 'invalid move. Try again'
  this.printBoard()
  if (this.winner) return `${this.winner} wins!`
  this.turn = this.turn === 'X' ?
    'O' : 'X'
  console.log(`it is ${this.turn}'s turn`)
}

Board.prototype.winCheck = function(row, col) {
  let winner = false;
  
  const check = seq => {
    console.log(seq)
    let counter = 0;
    for(var i = 0; i < seq.length-1; i++) {
      if (seq[i] && seq[i] !== ' ' && seq[i] === seq[i+1]) {
        counter++
        console.log(counter)
      } else {
        counter = 0
      } 
      if (counter === 3) return winner=seq[i]
    }
  }
  check(this.createRow(row))
  check(col)
  if (winner) this.winner = winner
}

Board.prototype.createRow = function(idx) {
  let row = [];
  this.cols.forEach(col=>{
    let piece = col[idx] ? col[idx] : ' '
    row.push(piece)
  })
  return row;
}

Board.prototype.printBoard = function(){
  console.log('+---------------------+')
  for (let i = 5; i >=0; i--) {
    console.log(`| ${this.createRow(i).join('  ')} |`)
  } 
  console.log('+---------------------+')
  console.log('  0  1  2  3  4  5  6\n')
}


let board = new Board
let placePiece = board.placePiece.bind(board)
board.printBoard()
console.log(`'${board.turn}' goes first`)
console.log(`
call placePiece() with a
column number to place a
piece at that column`)

