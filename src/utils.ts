import { BOARD_COLS, BOARD_ROWS, CELL_HEIGHT, CELL_WIDTH } from './constants'
import { Board, Automaton, StateCount } from './types'

const stateColors = ['black', 'salmon', 'teal']

function countNbours(
  board: Board,
  r0: number,
  c0: number,
  possibleStateCount: StateCount
): number[] {
  const result = new Array(possibleStateCount).fill(0)
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const r = r0 + dr
      const c = c0 + dc
      if (r < 0 || r >= BOARD_ROWS) continue
      if (c < 0 || c >= BOARD_COLS) continue

      result[board[r][c]]++
    }
  }
  return result
}

function computeNextBoard(automaton: Automaton, current: Board, next: Board) {
  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const nbors = countNbours(current, r, c, automaton.length)
      const transition = automaton[current[r][c]] ?? automaton[0]
      next[r][c] = transition[nbors.join('')] ?? transition.default
    }
  }
}

function createBoard(): Board {
  return new Array(BOARD_ROWS).fill(0).map(() => {
    return new Array(BOARD_COLS).fill(0)
  })
}

function render(board: Board, app: HTMLCanvasElement) {
  const ctx = app.getContext('2d')
  if (!ctx) throw new Error('could not init 2d context')

  for (let r = 0; r < BOARD_ROWS; ++r) {
    for (let c = 0; c < BOARD_COLS; ++c) {
      ctx.fillStyle = stateColors[board[c][r]]
      const x = Math.floor(r * CELL_WIDTH)
      const y = Math.floor(c * CELL_HEIGHT)
      ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
    }
  }
}

export { render, computeNextBoard, createBoard }
