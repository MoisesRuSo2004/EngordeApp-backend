import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreatePesajeDto } from './dto/create-pesaje.dto';
export interface GdpResult {
    gdpKgDia: number;
    pesoActualKg: number;
    pesoProyectado7d: number;
    pesoProyectado15d: number;
    pesoProyectado30d: number;
    pesoProyectado60d: number;
    diasDesdeUltimoPesaje: number;
}
export declare class PesajesService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, dto: CreatePesajeDto): Promise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fotoUrl: string | null;
        fecha: Date;
        pesoKg: number;
        nota: string | null;
        animalId: string;
    }>;
    findByAnimal(animalId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fotoUrl: string | null;
        fecha: Date;
        pesoKg: number;
        nota: string | null;
        animalId: string;
    }[]>;
    findByLote(loteId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fotoUrl: string | null;
        fecha: Date;
        pesoKg: number;
        nota: string | null;
        animalId: string;
    }[]>;
    calcularGdp(animalId: string): Promise<GdpResult>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        loteId: string;
        fotoUrl: string | null;
        fecha: Date;
        pesoKg: number;
        nota: string | null;
        animalId: string;
    }>;
}
