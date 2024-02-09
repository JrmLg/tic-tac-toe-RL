import { Game } from './game.js'
import { Agent } from './agent.js'
import { question, questionYesNo, formatNumberWithSpaces } from './utils.js'

const game = new Game()
const a1 = new Agent(0)
const a2 = new Agent(0)

try {
  a1.loadPolicy('policy1.json')
  a2.loadPolicy('policy2.json')
} catch (e) {
  console.log("No existing policies found.\nTrying to train ai first with this command : 'npm run train'")
  process.exit(1)
}

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

console.log(`First AI opponent has been trained over a total of ${formatNumberWithSpaces(a1.trainningGameCount)} games.`)
console.log(`Second AI opponent has been trained over a total of ${formatNumberWithSpaces(a2.trainningGameCount)} games.\n`)
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

console.log('')

process.exit(0)
