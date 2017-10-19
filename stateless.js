// StatelessTicTacToe module

const STATUS_GAME_OVER = 0
const STATUS_GAME_ON = 1

const status = (board) => {
  if (hasWon(board, 'X') || hasWon(board, 'O')) {
    return STATUS_GAME_OVER
  }
  return STATUS_GAME_ON
}

const count = (board, letter) => board
  .reduce((sum, square) => sum + (square === letter), 0)

const turn = (board) =>
  count(board, 'X') > count(board, 'O') ? 'O' : 'X'

const hasWon = (board, letter) =>
  ['012', '345', '678', '036', '147', '258', '048', '246']
    .some(t => t.split('')
      .every(i => board[i] === letter)
    )

const reset = () => new Array(9).fill('')

const placeAt = (board, i) => {
  if (!Number.isInteger(i) || i < 0 && i >= board.length) {
    return board
  }
  if (status(board) === STATUS_GAME_ON) {
    return [
      ...board.slice(0, i),
      turn(board),
      ...board.slice(i + 1)
    ]
  }
  return board
}

const print = (board) => {
  let res = ''
  const size = Math.sqrt(board.length)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      res += ((c || '') && '|') + (board[size * r + c] || '_')
    }
    res += '\n'
  }
  return res
}


/*
const boardHistory = [reset()]
let board = boardHistory[boardHistory.length - 1]

while (status(board) === STATUS_GAME_ON) {
  let pos = prompt('Move where?')
  if (pos === null) break;
  boardHistory.push(placeAt(board, parseInt(pos)))
  board = boardHistory[boardHistory.length - 1]
  console.log(print(board))
  console.log('')
}
*/


let board = reset()
const $board = document.querySelector('.ttt-board')

for (let i = 0; i < 9; i++) {
  let $square = document.createElement('div')
  $square.classList.add('ttt-square')
  $square.dataset.index = i
  $board.append($square)
}

$board.addEventListener('click', (event) => {
  const i = event.target.dataset.index
  board = placeAt(board, parseInt(i))
  document.querySelectorAll('.ttt-square')[i]
    .innerHTML = board[i]
})