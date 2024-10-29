import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('game_shots')
export class GameShot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'assisted_id' })
  assisted: Player | null;

  @Column('int')
  minute: number;

  @Column()
  result: string;

  @Column()
  situation: string;

  @Column({ nullable: true })
  type: string;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column({ type: 'float', name: 'x_g' })
  xG: number;
}
