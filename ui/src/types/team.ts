import type { Game } from './game'
import type { Player } from './player'

export type TeamHistory = {
  id: number
  teamId: number
  h_a: 'h' | 'a'
  xG: number
  xGA: number
  npxG: number
  npxGA: number
  ppda: {
    att: number
    def: number
  }
  ppda_allowed: {
    att: number
    def: number
  }
  deep: number
  deep_allowed: number
  scored: number
  missed: number
  xpts: number
  result: 'w' | 'd' | 'l'
  date: string
  wins: number
  draws: number
  loses: number
  pts: number
  npxGD: number
}

export type Team = {
  id: number
  title: string
  slug: string
  histories: TeamHistory[]
  players: Player[]
  hGames: Game[]
  aGames: Game[]
}
