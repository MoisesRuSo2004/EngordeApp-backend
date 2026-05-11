import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { PesajesService } from './pesajes.service';
import { CreatePesajeDto } from './dto/create-pesaje.dto';
export declare class PesajesController {
    private pesajes;
    constructor(pesajes: PesajesService);
    create(user: JwtPayload, dto: CreatePesajeDto): Promise<{
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
    calcularGdp(animalId: string): Promise<import("./pesajes.service").GdpResult>;
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
