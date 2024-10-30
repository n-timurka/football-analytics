import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameEvent } from './game-event.entity';
import { Team } from 'src/teams/entities/team.entity';

type GameTeamStat = {
  goals: number;
  xg: number;
  shots: number;
  shotOnTarget: number;
  deep: number;
  ppda: number;
};

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'h_id' })
  hId: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'h_id' })
  h: Team;

  @Column({ type: 'int', name: 'a_id' })
  aId: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'a_id' })
  a: Team;

  @Column({ nullable: true })
  result: string | null;

  @Column({ name: 'h_stats', type: 'simple-json', nullable: true })
  hStats: GameTeamStat | null;

  @Column({ name: 'a_stats', type: 'simple-json', nullable: true })
  aStats: GameTeamStat | null;

  @Column({ type: 'simple-json', nullable: true })
  chanses: { w: number; d: number; l: number };

  @Column('timestamp')
  datetime: Date;

  @OneToMany(() => GameEvent, (event) => event.game)
  events: GameEvent[];
}
