import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { DispositivosService } from './dispositivos.service';
import { UpsertTokenDto } from './dto/upsert-token.dto';
export declare class DispositivosController {
    private dispositivos;
    constructor(dispositivos: DispositivosService);
    registrarToken(user: JwtPayload, dto: UpsertTokenDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        token: string;
        plataforma: string;
        activo: boolean;
        updatedAt: Date;
    }>;
    desactivarTokens(user: JwtPayload): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
