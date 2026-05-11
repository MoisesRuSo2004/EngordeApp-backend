import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PesajesService } from '../pesajes/pesajes.service';

export interface AlertaComputed {
  tipo: 'PESAJE_PENDIENTE' | 'CRECIMIENTO_LENTO' | 'PRECIO_SIN_ACTUALIZAR';
  mensaje: string;
  animalId?: string;
  loteId?: string;
  arete?: string | null;
  loteNombre?: string;
  diasSinPesar?: number;
  gdp?: number;
}

export interface TopAnimal {
  animalId: string;
  arete?: string | null;
  raza?: string | null;
  loteNombre: string;
  loteId: string;
  gdpKgDia: number;
  pesoActualKg: number;
  utilidadHoyCop: number;
  margenHoyPct: number;
}

export interface GastoCategoriaResumen {
  categoria: string;
  total: number;
}

export interface ResumenGlobal {
  totalLotesActivos: number;
  totalAnimalesActivos: number;
  totalInvertidoCop: number;
  valorEstimadoHoyCop: number;
  utilidadEstimadaCop: number;
  precioKiloVigente: number;
  gdpPromedioGlobal: number;
  alertas: AlertaComputed[];
  topMejores: TopAnimal[];
  topPeores: TopAnimal[];
  gastosMesCop: number;
  gastosMesPorCategoria: GastoCategoriaResumen[];
}

@Injectable()
export class ResumenService {
  constructor(
    private prisma: PrismaService,
    private pesajes: PesajesService,
  ) {}

  async calcularResumen(userId: string): Promise<ResumenGlobal> {
    const lotes = await this.prisma.lote.findMany({
      where: { userId, estado: 'ACTIVO' },
      include: { animales: { where: { deletedAt: null } } },
    });

    const precioMercado = await this.prisma.precioMercado.findFirst({
      where: { userId },
      orderBy: { fecha: 'desc' },
    });
    const precioKilo = precioMercado?.precioKiloCop ?? 0;

    const hoy = new Date();
    const DIAS_ALERTA_PESAJE = 30;
    const GDP_UMBRAL_LENTO = 0.7;

    let totalInvertido = 0;
    let valorEstimado = 0;
    let totalAnimales = 0;
    let sumGdp = 0;
    let countGdp = 0;
    const alertas: AlertaComputed[] = [];
    const metricas: TopAnimal[] = [];

    for (const lote of lotes) {
      for (const animal of lote.animales) {
        totalAnimales++;
        totalInvertido += animal.precioCompraCop;

        const gdpData = await this.pesajes.calcularGdp(animal.id);

        if (precioKilo > 0) {
          valorEstimado += gdpData.pesoActualKg * precioKilo;
        }

        if (gdpData.gdpKgDia > 0) {
          sumGdp += gdpData.gdpKgDia;
          countGdp++;
        }

        const valorVentaHoy = gdpData.pesoActualKg * precioKilo;
        const utilidad = valorVentaHoy - animal.precioCompraCop;
        const margen = animal.precioCompraCop > 0
          ? Math.round((utilidad / animal.precioCompraCop) * 1000) / 10
          : 0;

        metricas.push({
          animalId: animal.id,
          arete: animal.arete,
          raza: animal.raza,
          loteNombre: lote.nombre,
          loteId: lote.id,
          gdpKgDia: gdpData.gdpKgDia,
          pesoActualKg: gdpData.pesoActualKg,
          utilidadHoyCop: utilidad,
          margenHoyPct: margen,
        });

        if (gdpData.diasDesdeUltimoPesaje >= DIAS_ALERTA_PESAJE) {
          alertas.push({
            tipo: 'PESAJE_PENDIENTE',
            mensaje: `${animal.arete ? `Arete #${animal.arete}` : 'Animal'} en lote "${lote.nombre}" lleva ${gdpData.diasDesdeUltimoPesaje} días sin pesar`,
            animalId: animal.id,
            loteId: lote.id,
            arete: animal.arete,
            loteNombre: lote.nombre,
            diasSinPesar: gdpData.diasDesdeUltimoPesaje,
          });
        }

        if (gdpData.gdpKgDia > 0 && gdpData.gdpKgDia < GDP_UMBRAL_LENTO) {
          alertas.push({
            tipo: 'CRECIMIENTO_LENTO',
            mensaje: `${animal.arete ? `Arete #${animal.arete}` : 'Animal'} en lote "${lote.nombre}" tiene GDP de ${gdpData.gdpKgDia.toFixed(3)} kg/día (bajo)`,
            animalId: animal.id,
            loteId: lote.id,
            arete: animal.arete,
            loteNombre: lote.nombre,
            gdp: gdpData.gdpKgDia,
          });
        }
      }
    }

    if (!precioMercado) {
      alertas.push({
        tipo: 'PRECIO_SIN_ACTUALIZAR',
        mensaje: 'No has registrado un precio de mercado. Los cálculos de rentabilidad estarán incompletos.',
      });
    } else {
      const diasSinActualizar = Math.floor(
        (hoy.getTime() - new Date(precioMercado.fecha).getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diasSinActualizar > 7) {
        alertas.push({
          tipo: 'PRECIO_SIN_ACTUALIZAR',
          mensaje: `El precio de mercado lleva ${diasSinActualizar} días sin actualizarse.`,
        });
      }
    }

    // Top 3 mejores por utilidad (solo si hay precio vigente)
    const topMejores = precioKilo > 0
      ? [...metricas].sort((a, b) => b.utilidadHoyCop - a.utilidadHoyCop).slice(0, 3)
      : [];

    // Top 3 peores por GDP (solo animales con al menos un pesaje)
    const topPeores = [...metricas]
      .filter((m) => m.gdpKgDia > 0)
      .sort((a, b) => a.gdpKgDia - b.gdpKgDia)
      .slice(0, 3);

    // Gastos del mes actual
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const loteIds = lotes.map((l) => l.id);
    const gastosMes = loteIds.length > 0
      ? await this.prisma.gasto.findMany({
          where: { loteId: { in: loteIds }, fecha: { gte: inicioMes } },
          select: { montoCop: true, categoria: true },
        })
      : [];

    const gastosMesCop = gastosMes.reduce((s, g) => s + g.montoCop, 0);

    const porCategoriaMap = gastosMes.reduce<Record<string, number>>((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] ?? 0) + g.montoCop;
      return acc;
    }, {});
    const gastosMesPorCategoria = Object.entries(porCategoriaMap)
      .map(([categoria, total]) => ({ categoria, total }))
      .sort((a, b) => b.total - a.total);

    return {
      totalLotesActivos: lotes.length,
      totalAnimalesActivos: totalAnimales,
      totalInvertidoCop: totalInvertido,
      valorEstimadoHoyCop: valorEstimado,
      utilidadEstimadaCop: valorEstimado - totalInvertido,
      precioKiloVigente: precioKilo,
      gdpPromedioGlobal: countGdp > 0 ? Math.round((sumGdp / countGdp) * 1000) / 1000 : 0,
      alertas: alertas.sort((a, b) => {
        const orden = { PRECIO_SIN_ACTUALIZAR: 0, PESAJE_PENDIENTE: 1, CRECIMIENTO_LENTO: 2 };
        return orden[a.tipo] - orden[b.tipo];
      }),
      topMejores,
      topPeores,
      gastosMesCop,
      gastosMesPorCategoria,
    };
  }
}
