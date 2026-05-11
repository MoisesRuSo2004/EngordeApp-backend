import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PesajesService } from '../pesajes/pesajes.service';
import { GastosService } from '../gastos/gastos.service';

export interface RentabilidadAnimal {
  animalId: string;
  arete?: string | null;
  raza?: string | null;
  pesoActualKg: number;
  gdpKgDia: number;
  pesoProyectado30d: number;
  precioCompraCop: number;
  gastosDirectosCop: number;
  costoTotalCop: number;
  valorVentaHoyCop: number;
  utilidadHoyCop: number;
  margenHoyPct: number;
  valorVenta30dCop: number;
  utilidad30dCop: number;
  margen30dPct: number;
}

export interface RentabilidadLote {
  loteId: string;
  nombre: string;
  totalAnimales: number;
  precioKiloMercado: number;
  costoTotalLoteCop: number;
  gastosLoteCop: number;
  valorVentaTotalHoyCop: number;
  utilidadHoyCop: number;
  margenHoyPct: number;
  gdpPromedioKgDia: number;
  animales: RentabilidadAnimal[];
}

@Injectable()
export class RentabilidadService {
  constructor(
    private prisma: PrismaService,
    private pesajes: PesajesService,
    private gastos: GastosService,
  ) {}

  async calcularLote(loteId: string, userId: string): Promise<RentabilidadLote> {
    const lote = await this.prisma.lote.findFirst({
      where: { id: loteId, userId },
      include: { animales: { where: { deletedAt: null } } },
    });
    if (!lote) throw new Error('Lote no encontrado');

    // Precio de mercado más reciente del usuario
    const precioMercado = await this.prisma.precioMercado.findFirst({
      where: { userId },
      orderBy: { fecha: 'desc' },
    });
    const precioKilo = precioMercado?.precioKiloCop ?? 0;

    // Gastos a nivel de lote (no asignados a animal específico)
    const resumenGastos = await this.gastos.resumenByLote(loteId);
    const gastosLote = resumenGastos.lista
      .filter((g) => !g.animalId)
      .reduce((s, g) => s + g.montoCop, 0);
    const gastosLotePorAnimal = lote.animales.length > 0 ? gastosLote / lote.animales.length : 0;

    const animalesCalculo: RentabilidadAnimal[] = [];

    for (const animal of lote.animales) {
      const gdpData = await this.pesajes.calcularGdp(animal.id);

      // Gastos directos del animal
      const gastosDirectos = resumenGastos.lista
        .filter((g) => g.animalId === animal.id)
        .reduce((s, g) => s + g.montoCop, 0);

      const costoTotal = animal.precioCompraCop + gastosDirectos + gastosLotePorAnimal;
      const valorHoy = gdpData.pesoActualKg * precioKilo;
      const utilidadHoy = valorHoy - costoTotal;
      const valor30d = gdpData.pesoProyectado30d * precioKilo;
      const utilidad30d = valor30d - costoTotal;

      animalesCalculo.push({
        animalId: animal.id,
        arete: animal.arete,
        raza: animal.raza,
        pesoActualKg: gdpData.pesoActualKg,
        gdpKgDia: gdpData.gdpKgDia,
        pesoProyectado30d: gdpData.pesoProyectado30d,
        precioCompraCop: animal.precioCompraCop,
        gastosDirectosCop: gastosDirectos + gastosLotePorAnimal,
        costoTotalCop: costoTotal,
        valorVentaHoyCop: valorHoy,
        utilidadHoyCop: utilidadHoy,
        margenHoyPct: costoTotal > 0 ? Math.round((utilidadHoy / costoTotal) * 100 * 10) / 10 : 0,
        valorVenta30dCop: valor30d,
        utilidad30dCop: utilidad30d,
        margen30dPct: costoTotal > 0 ? Math.round((utilidad30d / costoTotal) * 100 * 10) / 10 : 0,
      });
    }

    const totalValorHoy = animalesCalculo.reduce((s, a) => s + a.valorVentaHoyCop, 0);
    const totalCosto = animalesCalculo.reduce((s, a) => s + a.costoTotalCop, 0);
    const utilidadTotal = totalValorHoy - totalCosto;
    const gdpPromedio =
      animalesCalculo.length > 0
        ? animalesCalculo.reduce((s, a) => s + a.gdpKgDia, 0) / animalesCalculo.length
        : 0;

    return {
      loteId,
      nombre: lote.nombre,
      totalAnimales: lote.animales.length,
      precioKiloMercado: precioKilo,
      costoTotalLoteCop: totalCosto,
      gastosLoteCop: resumenGastos.total,
      valorVentaTotalHoyCop: totalValorHoy,
      utilidadHoyCop: utilidadTotal,
      margenHoyPct: totalCosto > 0 ? Math.round((utilidadTotal / totalCosto) * 100 * 10) / 10 : 0,
      gdpPromedioKgDia: Math.round(gdpPromedio * 1000) / 1000,
      animales: animalesCalculo.sort((a, b) => b.utilidadHoyCop - a.utilidadHoyCop),
    };
  }
}
