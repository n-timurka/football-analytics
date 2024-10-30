import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { GetPlayersDto } from './dto/get-players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private teamsRepository: Repository<Player>,
  ) {}

  findAll(dto: GetPlayersDto) {
    const options: FindManyOptions = {
      order: { position: 'ASC' },
    };

    if (dto.team_id) {
      options.where = { teamId: +dto.team_id };
    }

    return this.teamsRepository.find(options);
  }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id });
  }
}
