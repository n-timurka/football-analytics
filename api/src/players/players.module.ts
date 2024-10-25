import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PlayersController],
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayersService],
})
export class PlayersModule {}
