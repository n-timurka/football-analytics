import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamHistory } from './team-history.entity';
import { Player } from 'src/players/entities/player.entity';
import { TeamStats } from './team-stats.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team)
  histories: TeamHistory[];

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => TeamStats, (stats) => stats.team)
  stats: TeamStats;
}
