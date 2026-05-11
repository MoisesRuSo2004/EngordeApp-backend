import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { DispositivosService } from './dispositivos.service';
import { UpsertTokenDto } from './dto/upsert-token.dto';

@UseGuards(JwtAuthGuard)
@Controller('dispositivos')
export class DispositivosController {
  constructor(private dispositivos: DispositivosService) {}

  /** Registra / actualiza el push token del dispositivo actual */
  @Post('token')
  registrarToken(@CurrentUser() user: JwtPayload, @Body() dto: UpsertTokenDto) {
    return this.dispositivos.upsertToken(user.sub, dto);
  }

  /** Desactiva notificaciones del usuario (llamar al hacer logout) */
  @Delete('token')
  desactivarTokens(@CurrentUser() user: JwtPayload) {
    return this.dispositivos.desactivarTokens(user.sub);
  }
}
