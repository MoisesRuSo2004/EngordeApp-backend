import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { EstadoLote } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('lotes')
export class LotesController {
  constructor(private lotes: LotesService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateLoteDto) {
    return this.lotes.create(user.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query('estado') estado?: EstadoLote) {
    return this.lotes.findAll(user.sub, estado);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.lotes.findOne(user.sub, id);
  }

  @Put(':id')
  update(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() dto: Partial<CreateLoteDto>) {
    return this.lotes.update(user.sub, id, dto);
  }

  @Put(':id/archivar')
  archivar(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.lotes.archivar(user.sub, id);
  }
}
