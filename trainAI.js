import { Game } from './game.js'
import { Agent } from './agent.js'

const game = new Game()
const a1 = new Agent('a1')
const a2 = new Agent('a2')

// a1.loadPolicy('policy1.json')
// a2.loadPolicy('policy2.json')

const trainCount = 50000
const printInterval = Math.floor(trainCount / 1000) - 1

for (let i = 0; i < trainCount; i++) {
  // A game loop
  if (i % printInterval === 0) {
    const percentage = ((100 * i) / trainCount).toFixed(1)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Trainning game : ${percentage}%`)
    Number.toFixed
  }

  while (!game.isFinished) {
    a1.play(game)

    if (game.isFinished) {
      if (game.winner === 'X') {
        a1.learn(1)
        a2.learn(0)
      } else {
        a1.learn(0.1)
        a2.learn(0.5)
      }
      continue
    }

    a2.play(game)

    if (game.isFinished) {
      if (game.winner === 'O') {
        a1.learn(0)
        a2.learn(1)
      } else {
        a1.learn(0.1)
        a2.learn(0.5)
      }
    }
  }
  game.newGame()
  a1.reset()
  a2.reset()
}

process.stdout.write('\n')
console.log('Training complete! For ', trainCount, ' games.')

a1.savePolicy('policy1.json')
a2.savePolicy('policy2.json')

console.log('Policies are saved in policy1.json and policy2.json')
