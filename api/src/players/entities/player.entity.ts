import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerPosition } from '../enums/position.enum';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', nullable: true })
  number: number | null;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ name: 'team_id', type: 'int' })
  teamId: number;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ type: 'enum', enum: PlayerPosition, nullable: true })
  position: PlayerPosition;

  @Column('int')
  games: number;

  @Column('int')
  time: number;

  @Column('int')
  goals: number;

  @Column('float')
  xG: number;

  @Column('int')
  assists: number;

  @Column('float')
  xA: number;

  @Column('int')
  shots: number;

  @Column({ name: 'key_passes', type: 'int' })
  keyPasses: number;

  @Column({ name: 'yellow_cards', type: 'int' })
  yellowCards: number;

  @Column({ name: 'red_cards', type: 'int' })
  redCards: number;

  @Column('int')
  npg: number;

  @Column('float')
  npxG: number;

  @Column('float')
  xGChain: number;

  @Column('float')
  xGBuildup: number;
}
