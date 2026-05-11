import { PrismaService } from '../prisma/prisma.service';
import { CreateFincaDto } from './dto/create-finca.dto';
export declare class FincasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateFincaDto): import("@prisma/client").Prisma.Prisma__FincaClient<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(userId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
    update(userId: string, id: string, dto: Partial<CreateFincaDto>): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
}
