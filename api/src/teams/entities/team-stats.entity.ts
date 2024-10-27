import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Team } from './team.entity';

interface ShotStats {
  time?: number;
  shots: number;
  goals?: number;
  xG: number;
}

@Entity('team_stats')
@Index(['teamId', 'isAgainst'], { unique: true })
export class TeamStats {
  @PrimaryColumn({ type: 'int', name: 'team_id' })
  teamId: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @PrimaryColumn({ type: 'bool', name: 'is_against' })
  isAgainst: boolean;

  @Column({ type: 'simple-json' })
  result: {
    missed: ShotStats;
    post: ShotStats;
    goal: ShotStats;
    saved: ShotStats;
    blocked: ShotStats;
  };

  @Column({ type: 'simple-json' })
  attackSpeed: {
    slow: ShotStats;
    normal: ShotStats;
    standart: ShotStats;
    fast: ShotStats;
  };

  @Column({ type: 'simple-json' })
  shotZone: {
    obox: ShotStats;
    penaltyArea: ShotStats;
    sixYardBox: ShotStats;
  };

  @Column({ type: 'simple-json' })
  timing: {
    '1-15': ShotStats;
    '16-30': ShotStats;
    '31-45': ShotStats;
    '46-60': ShotStats;
    '61-75': ShotStats;
    '76-90': ShotStats;
  };

  @Column({ type: 'simple-json' })
  gameState: {
    '0': ShotStats;
    '-1': ShotStats;
    '+1': ShotStats;
    '<-1': ShotStats;
    '>+1': ShotStats;
  };

  @Column({ type: 'simple-json' })
  formation: Record<string, ShotStats>;

  @Column({ type: 'simple-json' })
  situation: {
    openPlay: ShotStats;
    corner: ShotStats;
    freekick: ShotStats;
    setPiece: ShotStats;
    penalty: ShotStats;
  };
}
