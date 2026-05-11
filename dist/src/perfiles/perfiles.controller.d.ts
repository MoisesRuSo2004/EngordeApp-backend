import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { PerfilesService } from './perfiles.service';
declare class CrearPerfilDto {
    userId: string;
    username: string;
    email: string;
}
declare class ActualizarUsernameDto {
    username: string;
    email: string;
}
export declare class PerfilesController {
    private perfiles;
    constructor(perfiles: PerfilesService);
    checkDisponible(username: string): Promise<{
        disponible: boolean;
    }>;
    resolverEmail(username: string): Promise<{
        email: string;
    }>;
    crear(dto: CrearPerfilDto): Promise<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    }>;
    obtenerMio(user: JwtPayload): import("@prisma/client").Prisma.Prisma__PerfilClient<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    actualizarUsername(user: JwtPayload, dto: ActualizarUsernameDto): Promise<{
        id: string;
        userId: string;
        username: string;
        email: string;
        createdAt: Date;
    }>;
}
export {};
