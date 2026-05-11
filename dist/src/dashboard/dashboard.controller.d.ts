import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { RentabilidadService } from './rentabilidad.service';
import { ResumenService } from './resumen.service';
import { PrismaService } from '../prisma/prisma.service';
declare class SetPrecioMercadoDto {
    precioKiloCop: number;
    departamento?: string;
}
export declare class DashboardController {
    private rentabilidad;
    private resumen;
    private prisma;
    constructor(rentabilidad: RentabilidadService, resumen: ResumenService, prisma: PrismaService);
    resumenGlobal(user: JwtPayload): Promise<import("./resumen.service").ResumenGlobal>;
    rentabilidadLote(user: JwtPayload, loteId: string): Promise<import("./rentabilidad.service").RentabilidadLote>;
    setPrecioMercado(user: JwtPayload, dto: SetPrecioMercadoDto): import("@prisma/client").Prisma.Prisma__PrecioMercadoClient<{
        id: string;
        userId: string;
        departamento: string | null;
        createdAt: Date;
        fecha: Date;
        precioKiloCop: number;
        fuente: import("@prisma/client").$Enums.FuentePrecioMercado;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getPrecioMercado(user: JwtPayload): import("@prisma/client").Prisma.Prisma__PrecioMercadoClient<{
        id: string;
        userId: string;
        departamento: string | null;
        createdAt: Date;
        fecha: Date;
        precioKiloCop: number;
        fuente: import("@prisma/client").$Enums.FuentePrecioMercado;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
export {};
