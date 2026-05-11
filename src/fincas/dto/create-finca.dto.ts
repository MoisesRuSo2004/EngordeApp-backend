import { IsString, MinLength } from 'class-validator';

export class CreateFincaDto {
  @IsString() @MinLength(2)
  nombre: string;

  @IsString() @MinLength(2)
  municipio: string;

  @IsString() @MinLength(2)
  departamento: string;
}
