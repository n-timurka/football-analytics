import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamHistory } from './team-history.entity';
import { Player } from 'src/players/entities/player.entity';

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
}
