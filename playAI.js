import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { Game } from './game.js'
import { Agent } from './agent.js'

const game = new Game()
const a1 = new Agent('a1', 0)
const a2 = new Agent('a2', 0)

a1.loadPolicy('policy1.json')
a2.loadPolicy('policy2.json')

const rl = readline.createInterface({ input, output })

while (!game.isFinished) {
  console.log("AI's move: ")
  a1.play(game)
  game.displayBoard()

  if (game.isFinished) {
    break
  }

  console.log(game.availableMoves())
  const move = await rl.question('Enter your move: ')
  game.play(move)
  game.displayBoard()
}
