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
export declare class RentabilidadService {
    private prisma;
    private pesajes;
    private gastos;
    constructor(prisma: PrismaService, pesajes: PesajesService, gastos: GastosService);
    calcularLote(loteId: string, userId: string): Promise<RentabilidadLote>;
}
