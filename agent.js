import fs from 'fs'

export class Agent {
  constructor(epsilon = 0.3) {
    this.epsilon = epsilon // Exploration rate
    this.learningRate = 0.2
    this.decayGamma = 0.9

    this.statesValues = {}
    this.statesHistory = []
  }

  play(game) {
    const actions = game.availableMoves()
    let nextAction

    if (this.epsilon && Math.random() < this.epsilon) {
      const randomIdx = Math.floor(Math.random() * actions.length)
      nextAction = actions[randomIdx]
    } else {
      let maxValue

      for (const action of actions) {
        game.play(action)
        const nextHash = game.hash
        const nextValue = this.statesValues[nextHash] || 0

        if (!maxValue || nextValue > maxValue) {
          maxValue = nextValue
          nextAction = action
        }

        game.undoLastMove()
      }
    }

    game.play(nextAction)
    this.statesHistory.push(game.hash)
  }

  learn(reward) {
    for (let i = this.statesHistory.length - 1; i >= 0; i--) {
      const state = this.statesHistory[i]
      const value = this.statesValues[state] || 0

      this.statesValues[state] = value + this.learningRate * (this.decayGamma * reward - value)
      reward = this.statesValues[state]
    }
  }

  reset() {
    this.statesHistory = []
  }

  savePolicy(file) {
    fs.writeFileSync(file, JSON.stringify(this.statesValues))
  }

  loadPolicy(file) {
    this.statesValues = JSON.parse(fs.readFileSync(file))
  }
}
