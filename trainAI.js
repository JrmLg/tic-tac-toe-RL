import { Game } from './game.js'
import { Agent } from './agent.js'
import { questionYesNo } from './input.js'

const game = new Game()
const a1 = new Agent()
const a2 = new Agent()

const resetPolicies = await questionYesNo('Do you want to reset ai policies before trainning ?', false)
if (!resetPolicies) {
  console.log('Loading existing policies...')
  a1.loadPolicy('policy1.json')
  a2.loadPolicy('policy2.json')
} else {
  console.log('Resetting policies...')
}

const trainCount = 50000
const printInterval = Math.floor(trainCount / 1000) - 1

function displayLearningProgress(iteration) {
  if (iteration % printInterval === 0) {
    const percentage = ((100 * iteration) / trainCount).toFixed(1)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`Trainning game : ${percentage}%`)
    Number.toFixed
  }
}

function giveRewards(game) {
  if (game.isDraw) {
    a1.learn(0.5)
    a2.learn(0.5)
  } else if (game.winner === 'X') {
    a1.learn(1)
    a2.learn(0)
  } else if (game.winner === 'O') {
    a1.learn(0)
    a2.learn(1)
  }
}

for (let i = 0; i < trainCount; i++) {
  // A game loop
  displayLearningProgress(i)

  while (!game.isFinished) {
    a1.play(game)

    if (game.isFinished) {
      giveRewards(game)
      continue
    }

    a2.play(game)

    if (game.isFinished) {
      giveRewards(game)
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
