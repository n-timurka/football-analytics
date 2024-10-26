import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesService],
})
export class GamesModule {}
