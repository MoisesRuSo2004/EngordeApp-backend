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
export declare class ResumenService {
    private prisma;
    private pesajes;
    constructor(prisma: PrismaService, pesajes: PesajesService);
    calcularResumen(userId: string): Promise<ResumenGlobal>;
}
