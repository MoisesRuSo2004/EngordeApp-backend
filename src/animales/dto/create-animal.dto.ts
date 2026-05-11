import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  loteId: string;

  @IsNumber() @Min(0)
  pesoInicialKg: number;

  @IsInt() @Min(0)
  precioCompraCop: number;

  @IsOptional() @IsString()
  raza?: string;

  @IsOptional() @IsInt()
  edadMeses?: number;

  @IsOptional() @IsString()
  arete?: string;

  @IsOptional() @IsString()
  fotoUrl?: string;
}

export class CreateAnimalesMasivoDto {
  @IsString()
  loteId: string;

  @IsInt() @Min(1)
  cantidad: number;

  @IsNumber() @Min(0)
  pesoPromedioKg: number;

  @IsInt() @Min(0)
  precioPromedioCop: number;

  @IsOptional() @IsString()
  raza?: string;
}
