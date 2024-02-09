# tic-tac-toe-RL

This project is an implementation of Reinforcement Learning AI in Vanilla JavaScript.

## Objective

This is my first 'RL' project, so I decided to write it without any machine learning library in order to discover and learn the basics of reinforcement learning. The main objective is to train two agents to play against each other in a specific game environment. I used the principle of backpropagation reward at the end of each game to form the policy of each agent.

I also made the execution of the program interactive to allow the user to appreciate the evolution of learning depending on the number of games played, so it is possible to observe certain strategic assimilations of an AI in progress. learning.

## Features

- Train two agents to play against each other in a game environment.
- Implementation of the reinforcement learning algorithm to allow agents to learn from their actions and rewards.
- Visualization of the evolution of agents' performances over time.

## Installation

1. Clone this repository to your local machine.
2. Install all dependencies `npm install` or `yarn install`
3. Open a command line and enjoy !

## How to use

In the package.json file you can find 3 commands:

- `npm run train` : To train the AI
- `npm run play:ai` : To play against the AI
- `npm run play:human` : To play against a friend or alone =)

https://github.com/JrmLg/tic-tac-toe-RL/assets/63566435/d51646d8-b97e-4295-a3fe-a748afabe50e

## Observations

What I observed:

| strategie\experience                        | 10 games | 1000 games | 5000 games | 10 000 games | 50 000 games | 100 000 games |        1 000 000 games        |
| ------------------------------------------- | :------: | :--------: | :--------: | :----------: | :----------: | :-----------: | :---------------------------: |
| Win if we don't oppose                      |   yes    |    yes     |    yes     |     yes      |     yes      |      yes      |              yes              |
| Prevents the player from aligning 3 symbols |    -     |     -      | sometimes  |    often     |     yes      |      yes      |              yes              |
| Start playing in the center of the board    |    -     | sometimes  | sometimes  |    often     |     yes      |      yes      |              yes              |
| Rebuilds a strategy to win after opposition |   yes    |    yes     |    yes     |     yes      |     yes      |      yes      |              yes              |
| Uses a dual attack strategy                 |    -     | sometimes  | sometimes  |    often     |    often     |      yes      |              yes              |
| How many states positions does the AI know? |  17-20   |  290-310   | 1620-1730  |  2030-2200   |  2550-2620   |   2640-2700   | 2739(all states for 1 player) |

At 1,000,000 games the AI has already played all possible parts of the game.
Agent 1 knows 2739 states, agent 2 knows 2738 states between them they know 5477 game states.
There are 5478 game states possible game of tic-tac-toe, the last being the empty board, which does not interest the AI !

## Technologies Used

- JavaScript

## Author

This project was developed by Jérôme LEGO.

## License

This project is licensed under the [MIT License] (LICENSE) you are free to use, modify, distribute, and sublicense the software, subject to the conditions specified in the license.
