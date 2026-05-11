import {
  Body, Controller, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { PerfilesService } from './perfiles.service';

class CrearPerfilDto {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9_.]+$/, { message: 'Username solo puede contener letras, números, puntos y _' })
  username: string;

  @IsEmail()
  email: string;
}

class ActualizarUsernameDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-z0-9_.]+$/, { message: 'Username solo puede contener letras, números, puntos y _' })
  username: string;

  /** Email del usuario — requerido solo al crear el perfil por primera vez */
  @IsEmail()
  email: string;
}

@Controller('perfiles')
export class PerfilesController {
  constructor(private perfiles: PerfilesService) {}

  // ─── Rutas PÚBLICAS (sin JWT) ─────────────────────────────────────────────

  /** Check de disponibilidad — se llama mientras el usuario escribe */
  @Get('check/:username')
  checkDisponible(@Param('username') username: string) {
    return this.perfiles.checkDisponible(username);
  }

  /** Resolver username → email — se llama al hacer login con usuario */
  @Get('resolver/:username')
  resolverEmail(@Param('username') username: string) {
    return this.perfiles.resolverEmail(username);
  }

  /**
   * Crea el perfil tras el registro.
   * Es público porque en el momento del registro aún no hay JWT
   * (Supabase requiere confirmación de email antes de emitir sesión).
   */
  @Post()
  crear(@Body() dto: CrearPerfilDto) {
    return this.perfiles.crear(dto.userId, dto.username, dto.email);
  }

  // ─── Rutas PROTEGIDAS ─────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('mio')
  obtenerMio(@CurrentUser() user: JwtPayload) {
    return this.perfiles.obtenerPorUserId(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('username')
  actualizarUsername(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ActualizarUsernameDto,
  ) {
    return this.perfiles.actualizarUsername(user.sub, dto.username, dto.email);
  }
}
