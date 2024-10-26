import type { Team } from './team'

export type Game = {
  id: number
  h: Team
  a: Team
  hGoals: number | null
  aGoals: number | null
  hxG: number | null
  axG: number | null
  datetime: string
}
