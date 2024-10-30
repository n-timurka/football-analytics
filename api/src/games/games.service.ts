import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { GetGamesDto } from './dto/get-games.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Player>,
  ) {}

  findAll(dto: GetGamesDto) {
    const options: FindManyOptions = {
      relations: ['h', 'a', 'events'],
      order: { datetime: 'ASC' },
    };

    if (dto.teamId) {
      options.where = [{ hId: +dto.teamId }, { aId: +dto.teamId }];
    }

    return this.gamesRepository.find(options);
  }

  findOne(id: number) {
    return this.gamesRepository.findOneByOrFail({ id });
  }
}
