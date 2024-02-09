import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { Game } from './game.js'

const rl = readline.createInterface({ input, output })

async function playGame() {
  const game = new Game()
  game.displayBoard()

  while (!game.isFinished) {
    console.log(game.availableMoves())
    const move = await rl.question('Enter your move: ')
    game.play(move)
    game.displayBoard()
    console.log('Game hash |' + game.hash + '|')
  }

  console.log('Winner: ', game.winner)
}

playGame()
