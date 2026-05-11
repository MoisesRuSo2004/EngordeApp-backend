import { Injectable, NotFoundException } from '@nestjs/common';
import { EstadoLote } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoteDto } from './dto/create-lote.dto';

@Injectable()
export class LotesService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateLoteDto) {
    return this.prisma.lote.create({
      data: {
        ...dto,
        userId,
        fechaCompra: new Date(dto.fechaCompra),
      },
      include: { finca: true, proveedor: true },
    });
  }

  async findAll(userId: string, estado?: EstadoLote) {
    const lotes = await this.prisma.lote.findMany({
      where: { userId, ...(estado ? { estado } : {}) },
      include: {
        finca: true,
        proveedor: true,
        _count: { select: { animales: { where: { deletedAt: null } } } },
        animales: {
          where: { deletedAt: null },
          select: { precioCompraCop: true, estado: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return lotes.map((lote) => {
      const { animales, ...rest } = lote;
      const totalInvertidoCop = animales.reduce((s, a) => s + a.precioCompraCop, 0);
      const animalesActivos = animales.filter((a) => a.estado === 'ACTIVO').length;
      const diasEnOperacion = Math.floor(
        (Date.now() - new Date(lote.fechaCompra).getTime()) / (1000 * 60 * 60 * 24),
      );
      return { ...rest, totalInvertidoCop, animalesActivos, diasEnOperacion };
    });
  }

  async findOne(userId: string, id: string) {
    const lote = await this.prisma.lote.findFirst({
      where: { id, userId },
      include: {
        finca: true,
        proveedor: true,
        animales: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!lote) throw new NotFoundException('Lote no encontrado');
    return lote;
  }

  async update(userId: string, id: string, dto: Partial<CreateLoteDto>) {
    await this.findOne(userId, id);
    return this.prisma.lote.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.fechaCompra ? { fechaCompra: new Date(dto.fechaCompra) } : {}),
      },
    });
  }

  async archivar(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.lote.update({
      where: { id },
      data: { estado: EstadoLote.ARCHIVADO },
    });
  }
}
