class StatefulTicTacToe {
  constructor() {
    this.board = new Array(9)
    this.reset()
  }

  static get STATUS_GAME_OVER() {
    return 0
  }

  static get STATUS_GAME_ON() {
    return 1
  }

  hasWon(letter) {
    return ['012', '345', '678', '036', '147', '258', '048', '246']
      .some(t => t.split('')
        .every(i => this.board[i] === letter)
      )
  }

  reset() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = ''
    }
    this.turn = 0
    this.status = StatefulTicTacToe.STATUS_GAME_ON
  }

  placeAt(i) {
    if (!Number.isInteger(i) || i < 0 || i >= this.board.length) {
      return;
    }
    this.board[i] = this.board[i] || 'XO'[this.turn++ % 2]
    if (this.hasWon('OX'[this.turn % 2])) {
      this.status = StatefulTicTacToe.STATUS_GAME_OVER
    }
  }
  
  print() {
    let res = ''
    const size = Math.sqrt(this.board.length)
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        res += ((c || '') && '|') + (this.board[size * r + c] || '_')
      }
      res += '\n'
    }
    console.log(res)
  }
}


const game = new StatefulTicTacToe()
const boardHistory = [game.board.slice(0)]
// OR... push [row, col] onto game.moves and "rewind" for undo

while (game.status === StatefulTicTacToe.STATUS_GAME_ON) {
  let pos = prompt('Move where?')
  if (pos === null) break;
  game.placeAt(parseInt(pos))
  boardHistory.push(game.board.slice(0))
  game.print()
  console.log('')
}