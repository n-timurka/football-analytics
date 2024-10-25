import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity('team_histories')
export class TeamHistory {
  @PrimaryGeneratedColumn() id: number;

  @Column() teamId: number;
  @Column() h_a: 'h' | 'a';
  @Column('float') xG: number;
  @Column('float') xGA: number;
  @Column('float') npxG: number;
  @Column('float') npxGA: number;
  @Column('json') ppda: { att: number; def: number };
  @Column('json') ppda_allowed: { att: number; def: number };
  @Column('int') deep: number;
  @Column('int') deep_allowed: number;
  @Column('int') scored: number;
  @Column('int') missed: number;
  @Column('float') xpts: number;
  @Column() result: 'w' | 'd' | 'l';
  @Column() date: Date;
  @Column('int') wins: number;
  @Column('int') draws: number;
  @Column('int') loses: number;
  @Column('int') pts: number;
  @Column('float') npxGD: number;

  @ManyToOne(() => Team)
  team: Team;
}
