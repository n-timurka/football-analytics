import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll() {
    return this.teamsRepository.find({
      relations: ['histories'],
    });
  }

  findOne(slug: string) {
    return this.teamsRepository.findOne({
      where: { slug },
      relations: {
        histories: true,
        players: true,
        hGames: {
          h: true,
          a: true,
        },
        aGames: {
          h: true,
          a: true,
        },
      },
    });
  }
}
