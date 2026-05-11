import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { CategoriaGasto } from '@prisma/client';

export class CreateGastoDto {
  @IsUUID()
  loteId: string;

  @IsOptional() @IsUUID()
  animalId?: string;

  @IsEnum(CategoriaGasto)
  categoria: CategoriaGasto;

  @IsInt() @Min(1)
  montoCop: number;

  @IsDateString()
  fecha: string;

  @IsOptional() @IsString()
  descripcion?: string;
}
