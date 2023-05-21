export type StateCount = number

export type Board = StateCount[][]

type Transition = {
  [key: string]: number
  default: number
}

export type Automaton = Transition[]

export type Nullable<T> = T | null
