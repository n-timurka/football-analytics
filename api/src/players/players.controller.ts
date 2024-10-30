import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { GetPlayersDto } from './dto/get-players.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll(@Query() query: GetPlayersDto) {
    return this.playersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }
}
