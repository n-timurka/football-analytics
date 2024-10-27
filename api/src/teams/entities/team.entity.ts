import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamHistory } from './team-history.entity';
import { Player } from 'src/players/entities/player.entity';
import { Game } from 'src/games/entities/game.entity';
import { TeamStats } from './team-stats.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public title: string;

  @Column({ length: 100, unique: true })
  public slug: string;

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team)
  histories: TeamHistory[];

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => Game, (game) => game.h)
  hGames: Game[];

  @OneToMany(() => Game, (game) => game.a)
  aGames: Game[];

  @OneToMany(() => TeamStats, (stats) => stats.team)
  stats: TeamStats;
}
