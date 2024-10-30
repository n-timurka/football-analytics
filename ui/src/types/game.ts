import type { Team } from './team'

export type Game = {
  id: number
  h: Team
  a: Team
  result?: string
  hGoals: number | null
  aGoals: number | null
  hxG: number | null
  axG: number | null
  datetime: string
}
