import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGastoDto } from './dto/create-gasto.dto';

@Injectable()
export class GastosService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGastoDto) {
    return this.prisma.gasto.create({
      data: { ...dto, fecha: new Date(dto.fecha) },
    });
  }

  findByLote(loteId: string) {
    return this.prisma.gasto.findMany({
      where: { loteId },
      orderBy: { fecha: 'desc' },
    });
  }

  async resumenByLote(loteId: string) {
    const gastos = await this.prisma.gasto.findMany({ where: { loteId } });
    const total = gastos.reduce((s, g) => s + g.montoCop, 0);
    const porCategoria = gastos.reduce(
      (acc, g) => {
        acc[g.categoria] = (acc[g.categoria] ?? 0) + g.montoCop;
        return acc;
      },
      {} as Record<string, number>,
    );
    return { total, porCategoria, lista: gastos };
  }

  async delete(id: string) {
    const g = await this.prisma.gasto.findUnique({ where: { id } });
    if (!g) throw new NotFoundException('Gasto no encontrado');
    return this.prisma.gasto.delete({ where: { id } });
  }
}
