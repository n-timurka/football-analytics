import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamHistory } from './team-history.entity';
import { Player } from 'src/players/entities/player.entity';
import { TeamStats } from './team-stats.entity';
import { Game } from 'src/games/entities/game.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team, {
    cascade: true,
  })
  histories: TeamHistory[];

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => TeamStats, (stats) => stats.team)
  stats: TeamStats;

  @OneToMany(() => Game, (game) => game.h)
  hGames: Game[];

  @OneToMany(() => Game, (game) => game.a)
  aGames: Game[];
}
