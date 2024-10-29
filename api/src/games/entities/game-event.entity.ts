import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('game_events')
export class GameEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column('int')
  minute: number;

  @Column()
  type: 'goal' | 'sub' | 'ycard' | 'rcard';

  @Column({ type: 'simple-json', nullable: true })
  info: Record<string, any>;
}
