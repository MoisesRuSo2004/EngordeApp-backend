import { IsString, IsIn } from 'class-validator';

export class UpsertTokenDto {
  @IsString()
  token: string;

  @IsString()
  @IsIn(['ios', 'android', 'web'])
  plataforma: string;
}
