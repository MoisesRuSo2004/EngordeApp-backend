import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { FincasService } from './fincas.service';
import { CreateFincaDto } from './dto/create-finca.dto';

@UseGuards(JwtAuthGuard)
@Controller('fincas')
export class FincasController {
  constructor(private fincas: FincasService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateFincaDto) {
    return this.fincas.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.fincas.findAll(user.sub);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.fincas.findOne(user.sub, id);
  }

  @Put(':id')
  update(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: Partial<CreateFincaDto>) {
    return this.fincas.update(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.fincas.remove(user.sub, id);
  }
}
