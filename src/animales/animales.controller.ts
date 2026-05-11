import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

class VenderAnimalDto {
  @IsInt() @Min(1)
  precioVentaCop: number;

  @IsNumber() @Min(0)
  pesoVentaKg: number;

  @IsDateString()
  fechaVenta: string;
}
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { AnimalesService } from './animales.service';
import { CreateAnimalDto, CreateAnimalesMasivoDto } from './dto/create-animal.dto';

@UseGuards(JwtAuthGuard)
@Controller('animales')
export class AnimalesController {
  constructor(private animales: AnimalesService) {}

  @Post()
  create(@Body() dto: CreateAnimalDto) {
    return this.animales.create(dto);
  }

  @Post('masivo')
  createMasivo(@Body() dto: CreateAnimalesMasivoDto) {
    return this.animales.createMasivo(dto);
  }

  @Get('lote/:loteId')
  findByLote(@Param('loteId') loteId: string) {
    return this.animales.findByLote(loteId);
  }

  @Get('lote/:loteId/vendidos')
  findVendidosByLote(@Param('loteId') loteId: string) {
    return this.animales.findVendidosByLote(loteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animales.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateAnimalDto>) {
    return this.animales.update(id, dto);
  }

  @Post(':id/vender')
  vender(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: VenderAnimalDto,
  ) {
    return this.animales.vender(user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animales.remove(id);
  }
}
