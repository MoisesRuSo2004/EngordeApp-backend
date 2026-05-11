import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { EstadoLote } from '@prisma/client';
export declare class LotesController {
    private lotes;
    constructor(lotes: LotesService);
    create(user: JwtPayload, dto: CreateLoteDto): import("@prisma/client").Prisma.Prisma__LoteClient<{
        finca: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string;
            departamento: string;
            createdAt: Date;
        };
        proveedor: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string | null;
            createdAt: Date;
            telefono: string | null;
            historialCalificacion: number | null;
        } | null;
    } & {
        id: string;
        userId: string;
        nombre: string;
        createdAt: Date;
        fechaCompra: Date;
        fincaId: string;
        proveedorId: string | null;
        estado: import("@prisma/client").$Enums.EstadoLote;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(user: JwtPayload, estado?: EstadoLote): Promise<{
        totalInvertidoCop: number;
        animalesActivos: number;
        diasEnOperacion: number;
        finca: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string;
            departamento: string;
            createdAt: Date;
        };
        proveedor: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string | null;
            createdAt: Date;
            telefono: string | null;
            historialCalificacion: number | null;
        } | null;
        _count: {
            animales: number;
        };
        id: string;
        userId: string;
        nombre: string;
        createdAt: Date;
        fechaCompra: Date;
        fincaId: string;
        proveedorId: string | null;
        estado: import("@prisma/client").$Enums.EstadoLote;
    }[]>;
    findOne(user: JwtPayload, id: string): Promise<{
        finca: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string;
            departamento: string;
            createdAt: Date;
        };
        proveedor: {
            id: string;
            userId: string;
            nombre: string;
            municipio: string | null;
            createdAt: Date;
            telefono: string | null;
            historialCalificacion: number | null;
        } | null;
        animales: {
            id: string;
            createdAt: Date;
            estado: import("@prisma/client").$Enums.EstadoAnimal;
            deletedAt: Date | null;
            loteId: string;
            fotoUrl: string | null;
            pesoInicialKg: number;
            precioCompraCop: number;
            raza: string | null;
            edadMeses: number | null;
            arete: string | null;
            precioVentaCop: number | null;
            pesoVentaKg: number | null;
            fechaVenta: Date | null;
        }[];
    } & {
        id: string;
        userId: string;
        nombre: string;
        createdAt: Date;
        fechaCompra: Date;
        fincaId: string;
        proveedorId: string | null;
        estado: import("@prisma/client").$Enums.EstadoLote;
    }>;
    update(user: JwtPayload, id: string, dto: Partial<CreateLoteDto>): Promise<{
        id: string;
        userId: string;
        nombre: string;
        createdAt: Date;
        fechaCompra: Date;
        fincaId: string;
        proveedorId: string | null;
        estado: import("@prisma/client").$Enums.EstadoLote;
    }>;
    archivar(user: JwtPayload, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        createdAt: Date;
        fechaCompra: Date;
        fincaId: string;
        proveedorId: string | null;
        estado: import("@prisma/client").$Enums.EstadoLote;
    }>;
}
