import { PrismaService } from '../prisma/prisma.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
export declare class GastosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateGastoDto): import("@prisma/client").Prisma.Prisma__GastoClient<{
        id: string;
        createdAt: Date;
        loteId: string;
        fecha: Date;
        animalId: string | null;
        categoria: import("@prisma/client").$Enums.CategoriaGasto;
        montoCop: number;
        descripcion: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByLote(loteId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fecha: Date;
        animalId: string | null;
        categoria: import("@prisma/client").$Enums.CategoriaGasto;
        montoCop: number;
        descripcion: string | null;
    }[]>;
    resumenByLote(loteId: string): Promise<{
        total: number;
        porCategoria: Record<string, number>;
        lista: {
            id: string;
            createdAt: Date;
            loteId: string;
            fecha: Date;
            animalId: string | null;
            categoria: import("@prisma/client").$Enums.CategoriaGasto;
            montoCop: number;
            descripcion: string | null;
        }[];
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fecha: Date;
        animalId: string | null;
        categoria: import("@prisma/client").$Enums.CategoriaGasto;
        montoCop: number;
        descripcion: string | null;
    }>;
}
