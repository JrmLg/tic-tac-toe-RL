import { question } from './utils.js'
import { Game } from './game.js'

async function playGame() {
  const game = new Game()
  game.displayBoard()

  while (!game.isFinished) {
    console.log(game.availableMoves())
    const move = await question('Enter your move: ')
    game.play(move)
    game.displayBoard()
    console.log('Game hash |' + game.hash + '|')
  }

  console.log('Winner: ', game.winner)
}

playGame()
process.exit(0)
