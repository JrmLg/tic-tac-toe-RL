import { table } from 'table'

export class Game {
  constructor() {
    this.newGame()
  }

  get hash() {
    return this.board.join('')
  }

  newGame() {
    this.currentSymbol = 'X'
    this.board = new Array(9).fill(' ')
    this.winner = null
    this.isFinished = false
    this.isDraw = false
    this.moveHistory = []
  }

  play(i) {
    if (this.board[i] !== ' ') {
      throw new Error('Invalid move')
    }
    this.moveHistory.push(i)
    this.board[i] = this.currentSymbol
    this._nextSymbol()

    const winner = this._findWinner()
    if (winner) {
      this.winner = winner
      this.isFinished = true
      this.isDraw = false
    } else {
      if (this.moveHistory.length === 9) {
        this.isFinished = true
        this.isDraw = true
        this.winner = null
      }
    }
  }

  undoLastMove() {
    if (this.moveHistory.length === 0) {
      throw new Error('No moves to undo')
    }
    const action = this.moveHistory.pop()
    this.board[action] = ' '
    this._nextSymbol()
    this.isFinished = false
    this.isDraw = false
    this.winner = null
    return true
  }

  displayBoard() {
    const arr2D = []
    const boxNumbering = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088']

    const board = this.board.map((symbol, idx) => {
      if (symbol !== ' ') {
        return `\n  ${symbol}  \n`
      } else {
        return `\n\n  ${boxNumbering[idx]}  `
      }
    })

    for (let i = 0; i < 3; i++) {
      arr2D.push(board.slice(i * 3, i * 3 + 3))
    }

    const tbl = table(arr2D)
    console.log(tbl)
  }

  availableMoves() {
    const moves = []
    this.board.forEach((cell, idx) => {
      if (cell === ' ') {
        moves.push(idx)
      }
    })
    return moves
  }

  _nextSymbol() {
    this.currentSymbol = this.currentSymbol === 'X' ? 'O' : 'X'
  }

  _findWinner() {
    const combinations = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ]
    for (const combination of combinations) {
      const [a, b, c] = combination
      if (this.board[a] !== ' ' && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a]
      }
    }
    return null
  }
}
