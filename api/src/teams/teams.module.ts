import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamHistory } from './entities/team-history.entity';

@Module({
  controllers: [TeamsController],
  imports: [TypeOrmModule.forFeature([Team, TeamHistory])],
  providers: [TeamsService],
})
export class TeamsModule {}