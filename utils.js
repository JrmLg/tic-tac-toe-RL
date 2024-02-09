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

export async function getInteger(question, defaultValue, isValidCb) {
  let value = null
  while (!value) {
    const response = await rl.question(question + (defaultValue ? ` (${defaultValue}) : ` : ''))
    value = parseInt(response)

    if (isNaN(value) || (isValidCb && !isValidCb(value))) {
      if (defaultValue) {
        return defaultValue
      } else {
        console.log('Please enter a valid number : ')
        value = null
      }
    }
  }
  return value
}

export function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
