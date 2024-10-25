import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TeamHistory } from './team-history.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public title: string;

  @OneToMany(() => TeamHistory, (teamHistory) => teamHistory.team)
  histories: TeamHistory[];
}
