import { PrismaService } from '../prisma/prisma.service';
import { UpsertTokenDto } from './dto/upsert-token.dto';
export declare class DispositivosService {
    private prisma;
    constructor(prisma: PrismaService);
    upsertToken(userId: string, dto: UpsertTokenDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        token: string;
        plataforma: string;
        activo: boolean;
        updatedAt: Date;
    }>;
    desactivarTokens(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
