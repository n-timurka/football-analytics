import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Player>,
  ) {}

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneByOrFail({ id });
  }
}
