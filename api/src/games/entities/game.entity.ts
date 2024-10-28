import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn() public id: number;

  @ManyToOne(() => Team, (team) => team.hGames)
  @JoinColumn({ name: 'h_id' })
  h: Team;

  @ManyToOne(() => Team, (team) => team.aGames)
  @JoinColumn({ name: 'a_id' })
  a: Team;

  @Column({ type: 'int', name: 'h_goals', nullable: true })
  hGoals: number | null;

  @Column({ type: 'int', name: 'a_goals', nullable: true })
  aGoals: number | null;

  @Column({ type: 'float', name: 'h_xg', nullable: true })
  hxG: number | null;

  @Column({ type: 'float', name: 'a_xg', nullable: true })
  axG: number | null;

  @Column('timestamp')
  datetime: Date;
}
