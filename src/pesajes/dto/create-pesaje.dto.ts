import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreatePesajeDto {
  @IsUUID()
  animalId: string;

  @IsUUID()
  loteId: string;

  @IsDateString()
  fecha: string;

  @IsNumber() @Min(0)
  pesoKg: number;

  @IsOptional() @IsString()
  fotoUrl?: string;

  @IsOptional() @IsString()
  nota?: string;
}
