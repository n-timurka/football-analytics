import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private teamsRepository: Repository<Player>,
  ) {}

  findAll() {
    return this.teamsRepository.find();
  }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id });
  }
}
