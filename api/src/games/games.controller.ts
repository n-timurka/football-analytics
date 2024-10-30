import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { GetGamesDto } from './dto/get-games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll(@Query() dto: GetGamesDto) {
    return this.gamesService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }
}
