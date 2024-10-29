import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameEvent } from './game-event.entity';

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

  @Column({ name: 'h_id', type: 'int' })
  hId: number;

  @Column({ name: 'a_id', type: 'int' })
  aId: number;

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
