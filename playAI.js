import { Game } from './game.js'
import { Agent } from './agent.js'
import { question, questionYesNo } from './input.js'

const game = new Game()
const a1 = new Agent(0)
const a2 = new Agent(0)

a1.loadPolicy('policy1.json')
a2.loadPolicy('policy2.json')

async function playerFirstGameLoop() {
  while (!game.isFinished) {
    game.displayBoard()
    console.log('Available moves : ', game.availableMoves())
    const move = await question('Enter your move: ')
    game.play(move)

    if (game.isFinished) {
      break
    }

    game.displayBoard()
    console.log("AI's turn: ")
    a2.play(game)
  }
  game.displayBoard()

  if (game.isDraw) {
    return null
  }
  return game.winner === 'X' ? 'You' : 'AI'
}

async function aiFirstGameLoop() {
  while (!game.isFinished) {
    console.log("AI's turn: ")
    a1.play(game)
    game.displayBoard()

    if (game.isFinished) {
      break
    }

    console.log('Available moves : ', game.availableMoves())
    const move = await question('Enter your move: ')
    game.play(move)
    game.displayBoard()
  }
  if (game.isDraw) {
    return null
  }
  return game.winner === 'X' ? 'AI' : 'You'
}

const playerFirst = await questionYesNo('Do you want to play first ?', false)

let winner
if (playerFirst) {
  winner = await playerFirstGameLoop()
} else {
  winner = await aiFirstGameLoop()
}

if (winner) {
  console.log(winner, 'win the game !')
} else {
  console.log("It's a draw !")
}
