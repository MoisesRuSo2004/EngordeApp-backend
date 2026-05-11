import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { RentabilidadService } from './rentabilidad.service';
import { ResumenService } from './resumen.service';
import { PrismaService } from '../prisma/prisma.service';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

class SetPrecioMercadoDto {
  @IsInt() @Min(1)
  precioKiloCop: number;

  @IsOptional() @IsString()
  departamento?: string;
}

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private rentabilidad: RentabilidadService,
    private resumen: ResumenService,
    private prisma: PrismaService,
  ) {}

  @Get('resumen')
  resumenGlobal(@CurrentUser() user: JwtPayload) {
    return this.resumen.calcularResumen(user.sub);
  }

  @Get('rentabilidad/lote/:loteId')
  rentabilidadLote(@CurrentUser() user: JwtPayload, @Param('loteId') loteId: string) {
    return this.rentabilidad.calcularLote(loteId, user.sub);
  }

  @Post('precio-mercado')
  setPrecioMercado(@CurrentUser() user: JwtPayload, @Body() dto: SetPrecioMercadoDto) {
    return this.prisma.precioMercado.create({
      data: {
        userId: user.sub,
        precioKiloCop: dto.precioKiloCop,
        departamento: dto.departamento,
        fecha: new Date(),
        fuente: 'MANUAL',
      },
    });
  }

  @Get('precio-mercado')
  getPrecioMercado(@CurrentUser() user: JwtPayload) {
    return this.prisma.precioMercado.findFirst({
      where: { userId: user.sub },
      orderBy: { fecha: 'desc' },
    });
  }
}
