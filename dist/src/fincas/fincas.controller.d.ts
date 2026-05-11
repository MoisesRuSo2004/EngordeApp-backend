import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { FincasService } from './fincas.service';
import { CreateFincaDto } from './dto/create-finca.dto';
export declare class FincasController {
    private fincas;
    constructor(fincas: FincasService);
    create(user: JwtPayload, dto: CreateFincaDto): import("@prisma/client").Prisma.Prisma__FincaClient<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(user: JwtPayload): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }[]>;
    findOne(user: JwtPayload, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
    update(user: JwtPayload, id: string, dto: Partial<CreateFincaDto>): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
    remove(user: JwtPayload, id: string): Promise<{
        id: string;
        userId: string;
        nombre: string;
        municipio: string;
        departamento: string;
        createdAt: Date;
    }>;
}
