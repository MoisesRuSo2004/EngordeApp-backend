import { PrismaService } from '../prisma/prisma.service';
export interface PushPayload {
    titulo: string;
    cuerpo: string;
    data?: Record<string, unknown>;
}
export declare class NotificationsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    enviarAUsuario(userId: string, payload: PushPayload): Promise<void>;
}
