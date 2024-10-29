import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './entities/game-player.entity';
import { GameShot } from './entities/game-shot.entity';
import { GameEvent } from './entities/game-event.entity';

@Module({
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([Game, GamePlayer, GameShot, GameEvent])],
  providers: [GamesService],
})
export class GamesModule {}
