import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn() public id: number;

  @Column({ name: 'player_name' }) playerName: string;

  @Column({ name: 'team_id' }) teamId: number;

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column() games: number;

  @Column() time: number;

  @Column() goals: number;

  @Column('float') xG: number;

  @Column() assists: number;

  @Column('float') xA: number;

  @Column() shots: number;

  @Column({ name: 'key_passes' }) keyPasses: number;

  @Column({ name: 'yellow_cards' }) yellowCards: number;

  @Column({ name: 'red_cards' }) redCards: number;

  @Column() position: 'G' | 'D' | 'M' | 'F';

  @Column() npg: number;

  @Column('float') npxG: number;

  @Column('float') xGChain: number;

  @Column('float') xGBuildup: number;
}
