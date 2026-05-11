import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { PesajesService } from './pesajes.service';
import { CreatePesajeDto } from './dto/create-pesaje.dto';

@UseGuards(JwtAuthGuard)
@Controller('pesajes')
export class PesajesController {
  constructor(private pesajes: PesajesService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreatePesajeDto) {
    return this.pesajes.create(user.sub, dto);
  }

  @Get('animal/:animalId')
  findByAnimal(@Param('animalId') animalId: string) {
    return this.pesajes.findByAnimal(animalId);
  }

  @Get('animal/:animalId/gdp')
  calcularGdp(@Param('animalId') animalId: string) {
    return this.pesajes.calcularGdp(animalId);
  }

  @Get('lote/:loteId')
  findByLote(@Param('loteId') loteId: string) {
    return this.pesajes.findByLote(loteId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pesajes.delete(id);
  }
}
