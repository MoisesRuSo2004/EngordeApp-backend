import { Injectable, NotFoundException } from '@nestjs/common';
import { EstadoAnimal } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateAnimalDto, CreateAnimalesMasivoDto } from './dto/create-animal.dto';

@Injectable()
export class AnimalesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  create(dto: CreateAnimalDto) {
    return this.prisma.animal.create({ data: dto });
  }

  async createMasivo(dto: CreateAnimalesMasivoDto) {
    const animales = Array.from({ length: dto.cantidad }, () => ({
      loteId: dto.loteId,
      pesoInicialKg: dto.pesoPromedioKg,
      precioCompraCop: dto.precioPromedioCop,
      raza: dto.raza ?? null,
    }));
    return this.prisma.animal.createMany({ data: animales });
  }

  findByLote(loteId: string) {
    return this.prisma.animal.findMany({
      where: { loteId, deletedAt: null },
      include: {
        pesajes: { orderBy: { fecha: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const animal = await this.prisma.animal.findFirst({
      where: { id },
      include: {
        pesajes: { orderBy: { fecha: 'asc' } },
        gastos: { orderBy: { fecha: 'desc' } },
      },
    });
    if (!animal) throw new NotFoundException('Animal no encontrado');
    return animal;
  }

  findVendidosByLote(loteId: string) {
    return this.prisma.animal.findMany({
      where: { loteId, estado: 'VENDIDO' },
      orderBy: { fechaVenta: 'desc' },
    });
  }

  async update(id: string, dto: Partial<CreateAnimalDto>) {
    await this.findOne(id);
    return this.prisma.animal.update({ where: { id }, data: dto });
  }

  async vender(
    userId: string,
    id: string,
    dto: { precioVentaCop: number; pesoVentaKg: number; fechaVenta: string },
  ) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      include: { lote: { select: { nombre: true } } },
    });
    if (!animal) throw new NotFoundException('Animal no encontrado');

    const updated = await this.prisma.animal.update({
      where: { id },
      data: {
        estado: EstadoAnimal.VENDIDO,
        precioVentaCop: dto.precioVentaCop,
        pesoVentaKg: dto.pesoVentaKg,
        fechaVenta: new Date(dto.fechaVenta),
        deletedAt: new Date(),
      },
    });

    // Notificación push al ganadero
    const ganancia = dto.precioVentaCop - animal.precioCompraCop;
    const signo = ganancia >= 0 ? '+' : '';
    const etiqueta = animal.arete ? `Arete #${animal.arete}` : 'Animal';
    this.notifications.enviarAUsuario(userId, {
      titulo: '🐄 Venta registrada',
      cuerpo: `${etiqueta} vendido a $${dto.precioVentaCop.toLocaleString('es-CO')} · Resultado: ${signo}$${Math.abs(ganancia).toLocaleString('es-CO')}`,
      data: { loteId: animal.loteId },
    });

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.animal.update({
      where: { id },
      data: { deletedAt: new Date(), estado: EstadoAnimal.VENDIDO },
    });
  }
}
