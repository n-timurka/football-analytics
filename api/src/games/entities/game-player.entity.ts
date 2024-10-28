import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { Team } from 'src/teams/entities/team.entity';

@Entity('game_players')
@Index(['playerId', 'gameId'], { unique: true })
export class GamePlayer {
  @PrimaryColumn({ type: 'int', name: 'player_id' })
  playerId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @PrimaryColumn({ type: 'int', name: 'game_id' })
  gameId: number;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ nullable: true })
  position: string | null;

  @Column({ type: 'bool', name: 'is_starter' })
  isStarter: boolean;

  @Column('int')
  minutes: number;

  @Column('int')
  shots: number;

  @Column('int')
  goals: number;

  @Column({ type: 'int', name: 'yellow_card' })
  yCards: number;

  @Column({ type: 'int', name: 'red_card' })
  rCards: number;

  @Column({ type: 'int', name: 'key_passes' })
  keyPasses: number;

  @Column('int')
  assists: number;

  @Column({ type: 'float', name: 'x_g' })
  xG: number;

  @Column({ type: 'float', name: 'x_a' })
  xA: number;
}
