import { PrismaService } from '../prisma/prisma.service';
export declare class PerfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    checkDisponible(username: string): Promise<{
        disponible: boolean;
    }>;
    crear(userId: string, username: string, email: string): Promise<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    }>;
    resolverEmail(username: string): Promise<{
        email: string;
    }>;
    actualizarUsername(userId: string, nuevoUsername: string, email: string): Promise<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    }>;
    obtenerPorUserId(userId: string): import("@prisma/client").Prisma.Prisma__PerfilClient<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
