const Board = function(){
  this.cols = [];
  for (let i = 0; i < 7; i++) {
    this.cols[i] = new Array(6).fill(null)
  }
  this.turn = Math.random() > 0.5 ?
    'X' : 'O';
}

Board.prototype.placePiece = function(col) {
  this.winner = null;
  if (!this.cols[col]) return 'invalid move. Try again'
  let placed = false;
  this.cols[col].forEach((cell, i)=>{
    if (!cell && !placed) {
      this.cols[col][i] = this.turn;
      placed = true;
      this.winCheck(i, col)
    }
  })
  if (!placed) return 'invalid move. Try again'
  this.printBoard()
  if (this.winner) {
    this.turn = this.winner;
    this.clear();
    return`${this.winner} wins!`
  } else if (this.cols.every(col=>!col.includes(null))) {
    this.clear()
    return 'tie game!'
  } else {
    this.turn = this.turn === 'X' ?
      'O' : 'X'
  }
  console.log(`it is ${this.turn}'s turn`)
}

Board.prototype.clear = function(){
  for (let i = 0; i < 7; i++) {
    this.cols[i] = new Array(6).fill(null)
  }
}

Board.prototype.createRow = function(idx) {
  let row = [];
  this.cols.forEach(col=>{
    row.push(col[idx])
  })
  return row;
}

Board.prototype.createMajDiag = function(row, col) {
  let majDiag = [];
  while (row > 0 && col > 0) {
    row--;
    col--;
  }
  while (row < 5 && col < 6) {
    majDiag.push(this.cols[col][row])
    row++
    col++
  }
  return majDiag;
}

Board.prototype.createMinDiag = function(row, col) {
  let minDiag = [];
  while (row > 0 && col < 6) {
    row--;
    col++;
  }
  while (row <= 5 && col >= 0) {
    minDiag.push(this.cols[col][row])
    row++;
    col--;
  }
  return minDiag;
}

Board.prototype.printBoard = function(){
  console.log('+---------------------+')
  for (let i = 5; i >=0; i--) {
    console.log(`| ${this.createRow(i).map(char=>{
      return char ? char : ' '
    }).join('  ')} |`)
  } 
  console.log('+---------------------+')
  console.log('  0  1  2  3  4  5  6\n')
}

Board.prototype.winCheck = function(row, col) {
  let winner = false;
  
  const check = seq => {
    let counter = 0;
    for(var i = 0; i < seq.length-1; i++) {
      if (seq[i] && seq[i] === seq[i+1]) {
        counter++
      } else {
        counter = 0
      } 
      if (counter === 3) return winner=seq[i]
    }
  }
  
  check(this.cols[col])
  check(this.createRow(row))
  check(this.createMajDiag(row, col))
  check(this.createMinDiag(row, col))
  if (winner) this.winner = winner
}

let board = new Board
let placePiece = board.placePiece.bind(board)
board.printBoard()
console.log(`'${board.turn}' goes first`)
console.log(`
call placePiece() with a
column number to place a
piece at that column`)

