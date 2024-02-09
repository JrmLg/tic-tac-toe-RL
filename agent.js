import fs from 'fs'

export class Agent {
  constructor(name, expRate = 0.3) {
    this.name = name
    this.expRate = expRate
    this.lr = 0.2
    this.decayGamma = 0.9

    this.statesValues = {}
    this.statesHistory = []
  }

  play(game) {
    let nextAction
    const actions = game.availableMoves()
    if (actions.length === 0) {
      throw new Error('No available moves')
    }
    if (this.expRate && Math.random() < this.expRate) {
      nextAction = actions[Math.floor(Math.random() * actions.length)]
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

      this.statesValues[state] = value + this.lr * (this.decayGamma * reward - value)
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
