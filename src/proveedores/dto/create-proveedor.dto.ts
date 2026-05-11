import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  municipio?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  historialCalificacion?: number;
}
