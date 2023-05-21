import { render, computeNextBoard, createBoard } from './utils'
import { CELL_HEIGHT, CELL_WIDTH, APP_HEIGHT, APP_WIDTH } from './constants'
import { GoL, Seeds, BB } from './transitionTables'
import { Automaton, Nullable } from './types'

const app = document.getElementById('app') as HTMLCanvasElement

if (!app) throw new Error('no canvas found')

const nextButton = document.getElementById('next') as HTMLButtonElement

if (!nextButton) throw new Error('no next button found')

nextButton.addEventListener('click', () => {
  const type = (
    document.querySelector('input[name="type"]:checked') as HTMLInputElement
  ).value

  let automatonToUse: Nullable<Automaton> = null

  if (type === 'GoL') {
    automatonToUse = GoL
  } else if (type === 'Seeds') {
    automatonToUse = Seeds
  } else {
    automatonToUse = BB
  }

  computeNextBoard(automatonToUse, currentBoard, nextBoard)
  ;[currentBoard, nextBoard] = [nextBoard, currentBoard]
  render(currentBoard, app)
})

let currentBoard = createBoard()
let nextBoard = createBoard()

app.width = APP_WIDTH
app.height = APP_HEIGHT

app.addEventListener('click', (e) => {
  const state = document.getElementsByName('state')

  const col = Math.floor(e.offsetX / CELL_WIDTH)
  const row = Math.floor(e.offsetY / CELL_HEIGHT)
  for (let i = 0; i < state.length; i++) {
    if ((state[i] as HTMLInputElement).checked) {
      currentBoard[row][col] = i
      render(currentBoard, app)
      return
    }
  }
})

render(currentBoard, app)
