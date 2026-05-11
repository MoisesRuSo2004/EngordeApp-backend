import { CategoriaGasto } from '@prisma/client';
export declare class CreateGastoDto {
    loteId: string;
    animalId?: string;
    categoria: CategoriaGasto;
    montoCop: number;
    fecha: string;
    descripcion?: string;
}
