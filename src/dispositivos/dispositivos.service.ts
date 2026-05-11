import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertTokenDto } from './dto/upsert-token.dto';

@Injectable()
export class DispositivosService {
  constructor(private prisma: PrismaService) {}

  /** Guarda o actualiza el push token de un dispositivo para un usuario */
  async upsertToken(userId: string, dto: UpsertTokenDto) {
    return this.prisma.pushToken.upsert({
      where: { token: dto.token },
      create: {
        userId,
        token: dto.token,
        plataforma: dto.plataforma,
        activo: true,
      },
      update: {
        userId,           // por si cambió de cuenta en el mismo dispositivo
        plataforma: dto.plataforma,
        activo: true,
        updatedAt: new Date(),
      },
    });
  }

  /** Desactiva todos los tokens de un usuario (al cerrar sesión) */
  async desactivarTokens(userId: string) {
    return this.prisma.pushToken.updateMany({
      where: { userId },
      data: { activo: false },
    });
  }
}
