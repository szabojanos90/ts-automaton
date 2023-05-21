import { Automaton } from './types'

const GoL: Automaton = [
  //dead
  {
    '53': 1,
    default: 0,
  },
  //alive
  {
    '62': 1,
    '53': 1,
    default: 0,
  },
]

const Seeds: Automaton = [
  //dead
  {
    '62': 1,
    default: 0,
  },
  //alive
  {
    default: 0,
  },
]

const BB: Automaton = [
  // dead
  {
    '026': 1,
    '125': 1,
    '224': 1,
    '323': 1,
    '422': 1,
    '521': 1,
    '620': 1,
    default: 0,
  },
  // alive
  { default: 2 },
  // dying
  { default: 0 },
]

export { GoL, Seeds, BB }
