import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateProveedorDto) {
    return this.prisma.proveedor.create({
      data: { ...dto, userId },
    });
  }

  findAll(userId: string) {
    return this.prisma.proveedor.findMany({
      where: { userId },
      orderBy: { nombre: 'asc' },
      include: { _count: { select: { lotes: true } } },
    });
  }

  async findOne(userId: string, id: string) {
    const p = await this.prisma.proveedor.findFirst({
      where: { id, userId },
      include: {
        lotes: {
          select: { id: true, nombre: true, fechaCompra: true, estado: true },
          orderBy: { fechaCompra: 'desc' },
        },
      },
    });
    if (!p) throw new NotFoundException('Proveedor no encontrado');
    return p;
  }

  async update(userId: string, id: string, dto: Partial<CreateProveedorDto>) {
    const p = await this.prisma.proveedor.findFirst({ where: { id, userId } });
    if (!p) throw new NotFoundException('Proveedor no encontrado');
    return this.prisma.proveedor.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const p = await this.prisma.proveedor.findFirst({ where: { id, userId } });
    if (!p) throw new NotFoundException('Proveedor no encontrado');
    return this.prisma.proveedor.delete({ where: { id } });
  }
}
