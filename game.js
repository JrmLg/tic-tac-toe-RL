import { table } from 'table'

export class Game {
  constructor() {
    this.newGame()
  }

  get hash() {
    return this.board.join('')
  }

  newGame() {
    this.turn = 'X'
    this.board = new Array(9).fill(' ')
    this.winner = null
    this.isFinished = false
    this.moveHistory = []
  }

  play(i) {
    if (this.board[i] !== ' ') return
    this.moveHistory.push(i)
    this.board[i] = this.turn
    this._nextTurn()

    if (!this._findWinningCombination()) {
      if (this.moveHistory.length === 9) {
        this.isFinished = true
        this.winner = ' '
        return
      }
      return
    }

    this.winner = this.board[i]
    this.isFinished = true
  }

  undoLastMove() {
    if (this.moveHistory.length === 0) return false
    const i = this.moveHistory.pop()
    this.board[i] = ' '
    this._nextTurn()
    this.isFinished = false
    this.winner = null
    return true
  }

  displayBoard() {
    const arr2D = []
    const moveMarks = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088']
    const board = this.board.map((cell, idx) => {
      if (cell !== ' ') {
        return `\n  ${cell}  \n`
      }
      return `    \n\n  ${moveMarks[idx]}  `
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

  _nextTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X'
  }

  _findWinningCombination() {
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
        return combination
      }
    }
    return null
  }
}
