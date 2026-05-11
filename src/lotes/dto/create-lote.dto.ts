import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLoteDto {
  @IsString() @MinLength(2)
  nombre: string;

  @IsDateString()
  fechaCompra: string;

  @IsString()
  fincaId: string;

  @IsOptional() @IsString()
  proveedorId?: string;
}
