import { question } from './utils.js'
import { Game } from './game.js'

async function playGame() {
  const game = new Game()
  game.displayBoard()

  while (!game.isFinished) {
    const move = await question('Enter your move: ')
    game.play(move)
    game.displayBoard()
  }

  console.log('Winner: ', game.winner)
  process.exit(0)
}

playGame()
