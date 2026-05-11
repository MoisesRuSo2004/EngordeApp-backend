import { PrismaService } from '../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
export declare class ProveedoresService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateProveedorDto): import("@prisma/client").Prisma.Prisma__ProveedorClient<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            lotes: number;
        };
    } & {
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        lotes: {
            id: string;
            nombre: string;
            fechaCompra: Date;
            estado: import("@prisma/client").$Enums.EstadoLote;
        }[];
    } & {
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }>;
    update(userId: string, id: string, dto: Partial<CreateProveedorDto>): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }>;
}
