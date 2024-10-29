import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('team_histories')
export class TeamHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'h_a' })
  hA: 'h' | 'a';

  @Column('float')
  xG: number;

  @Column('float')
  xGA: number;

  @Column('float')
  npxG: number;

  @Column('float')
  npxGA: number;

  @Column('json')
  ppda: { att: number; def: number };

  @Column('json')
  ppda_allowed: { att: number; def: number };

  @Column('int')
  deep: number;

  @Column('int')
  deep_allowed: number;

  @Column('int')
  scored: number;

  @Column('int')
  missed: number;

  @Column('float')
  xpts: number;

  @Column()
  result: 'w' | 'd' | 'l';

  @Column()
  date: Date;

  @Column('int')
  wins: number;

  @Column('int')
  draws: number;

  @Column('int')
  loses: number;

  @Column('int')
  pts: number;

  @Column('float')
  npxGD: number;
}
