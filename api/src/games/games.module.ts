import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './entities/game-player.entity';

@Module({
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([Game, GamePlayer])],
  providers: [GamesService],
})
export class GamesModule {}
