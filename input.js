import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

export async function question(question) {
  return await rl.question(question)
}

export async function questionYesNo(question, defaultChoice) {
  const response = await rl.question(question + (defaultChoice ? ' ([y]/n) : ' : ' (y/[n]) : '))
  if (!response) {
    return defaultChoice
  }
  return response.toLowerCase().at(0) === 'y'
}
