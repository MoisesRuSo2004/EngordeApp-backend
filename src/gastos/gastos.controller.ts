import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';

@UseGuards(JwtAuthGuard)
@Controller('gastos')
export class GastosController {
  constructor(private gastos: GastosService) {}

  @Post()
  create(@Body() dto: CreateGastoDto) {
    return this.gastos.create(dto);
  }

  @Get('lote/:loteId')
  findByLote(@Param('loteId') loteId: string) {
    return this.gastos.findByLote(loteId);
  }

  @Get('lote/:loteId/resumen')
  resumen(@Param('loteId') loteId: string) {
    return this.gastos.resumenByLote(loteId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gastos.delete(id);
  }
}
