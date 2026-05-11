import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
export declare class ProveedoresController {
    private proveedores;
    constructor(proveedores: ProveedoresService);
    create(user: JwtPayload, dto: CreateProveedorDto): import("@prisma/client").Prisma.Prisma__ProveedorClient<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(user: JwtPayload): import("@prisma/client").Prisma.PrismaPromise<({
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
    findOne(user: JwtPayload, id: string): Promise<{
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
    update(user: JwtPayload, id: string, dto: Partial<CreateProveedorDto>): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }>;
    remove(user: JwtPayload, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string | null;
        createdAt: Date;
        telefono: string | null;
        historialCalificacion: number | null;
    }>;
}
