import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreatePesajeDto } from './dto/create-pesaje.dto';

export interface GdpResult {
  gdpKgDia: number;
  pesoActualKg: number;
  pesoProyectado7d: number;
  pesoProyectado15d: number;
  pesoProyectado30d: number;
  pesoProyectado60d: number;
  diasDesdeUltimoPesaje: number;
}

@Injectable()
export class PesajesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(userId: string, dto: CreatePesajeDto) {
    const animal = await this.prisma.animal.findUnique({
      where: { id: dto.animalId },
      include: { lote: { select: { nombre: true } } },
    });
    if (!animal) throw new NotFoundException('Animal no encontrado');

    const pesaje = await this.prisma.pesaje.create({
      data: { ...dto, fecha: new Date(dto.fecha) },
    });

    // Notificación push al ganadero
    const etiqueta = animal.arete ? `Arete #${animal.arete}` : 'Animal';
    this.notifications.enviarAUsuario(userId, {
      titulo: '✅ Pesaje registrado',
      cuerpo: `${etiqueta} — ${dto.pesoKg} kg · Lote ${animal.lote.nombre}`,
      data: { animalId: dto.animalId, loteId: dto.loteId },
    });

    return pesaje;
  }

  findByAnimal(animalId: string) {
    return this.prisma.pesaje.findMany({
      where: { animalId },
      orderBy: { fecha: 'asc' },
    });
  }

  findByLote(loteId: string) {
    return this.prisma.pesaje.findMany({
      where: { loteId },
      orderBy: { fecha: 'desc' },
    });
  }

  async calcularGdp(animalId: string): Promise<GdpResult> {
    const animal = await this.prisma.animal.findUnique({ where: { id: animalId } });
    if (!animal) throw new NotFoundException('Animal no encontrado');

    const pesajes = await this.prisma.pesaje.findMany({
      where: { animalId },
      orderBy: { fecha: 'asc' },
    });

    // Incluye el peso inicial como primer punto
    const puntos = [
      { fecha: animal.createdAt, pesoKg: animal.pesoInicialKg },
      ...pesajes.map((p) => ({ fecha: p.fecha, pesoKg: p.pesoKg })),
    ];

    const pesoActual = puntos[puntos.length - 1].pesoKg;
    const hoy = new Date();
    const ultimaFecha = puntos[puntos.length - 1].fecha;
    const diasDesdeUltimoPesaje = Math.floor(
      (hoy.getTime() - new Date(ultimaFecha).getTime()) / (1000 * 60 * 60 * 24),
    );

    // GDP usando los últimos 3 intervalos disponibles
    let gdpKgDia = 0;
    if (puntos.length >= 2) {
      const ultimos = puntos.slice(-Math.min(4, puntos.length));
      const intervalos: number[] = [];
      for (let i = 1; i < ultimos.length; i++) {
        const dias = Math.max(
          1,
          (new Date(ultimos[i].fecha).getTime() - new Date(ultimos[i - 1].fecha).getTime()) /
            (1000 * 60 * 60 * 24),
        );
        intervalos.push((ultimos[i].pesoKg - ultimos[i - 1].pesoKg) / dias);
      }
      gdpKgDia = intervalos.reduce((a, b) => a + b, 0) / intervalos.length;
    }

    return {
      gdpKgDia: Math.round(gdpKgDia * 1000) / 1000,
      pesoActualKg: pesoActual,
      pesoProyectado7d: Math.round((pesoActual + gdpKgDia * 7) * 10) / 10,
      pesoProyectado15d: Math.round((pesoActual + gdpKgDia * 15) * 10) / 10,
      pesoProyectado30d: Math.round((pesoActual + gdpKgDia * 30) * 10) / 10,
      pesoProyectado60d: Math.round((pesoActual + gdpKgDia * 60) * 10) / 10,
      diasDesdeUltimoPesaje,
    };
  }

  async delete(id: string) {
    const p = await this.prisma.pesaje.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Pesaje no encontrado');
    return this.prisma.pesaje.delete({ where: { id } });
  }
}
