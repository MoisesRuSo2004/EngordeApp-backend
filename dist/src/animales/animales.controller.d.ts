declare class VenderAnimalDto {
    precioVentaCop: number;
    pesoVentaKg: number;
    fechaVenta: string;
}
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { AnimalesService } from './animales.service';
import { CreateAnimalDto, CreateAnimalesMasivoDto } from './dto/create-animal.dto';
export declare class AnimalesController {
    private animales;
    constructor(animales: AnimalesService);
    create(dto: CreateAnimalDto): import("@prisma/client").Prisma.Prisma__AnimalClient<{
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createMasivo(dto: CreateAnimalesMasivoDto): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findByLote(loteId: string): import("@prisma/client").Prisma.PrismaPromise<({
        pesajes: {
            id: string;
            createdAt: Date;
            loteId: string;
            fotoUrl: string | null;
            fecha: Date;
            pesoKg: number;
            nota: string | null;
            animalId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    })[]>;
    findVendidosByLote(loteId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        pesajes: {
            id: string;
            createdAt: Date;
            loteId: string;
            fotoUrl: string | null;
            fecha: Date;
            pesoKg: number;
            nota: string | null;
            animalId: string;
        }[];
        gastos: {
            id: string;
            createdAt: Date;
            loteId: string;
            fecha: Date;
            animalId: string | null;
            categoria: import("@prisma/client").$Enums.CategoriaGasto;
            montoCop: number;
            descripcion: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }>;
    update(id: string, dto: Partial<CreateAnimalDto>): Promise<{
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }>;
    vender(user: JwtPayload, id: string, dto: VenderAnimalDto): Promise<{
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        estado: import("@prisma/client").$Enums.EstadoAnimal;
        deletedAt: Date | null;
        loteId: string;
        fotoUrl: string | null;
        pesoInicialKg: number;
        precioCompraCop: number;
        raza: string | null;
        edadMeses: number | null;
        arete: string | null;
        precioVentaCop: number | null;
        pesoVentaKg: number | null;
        fechaVenta: Date | null;
    }>;
}
export {};
