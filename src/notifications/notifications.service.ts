import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PushPayload {
  titulo: string;
  cuerpo: string;
  data?: Record<string, unknown>;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  /** Envía una notificación push a todos los dispositivos activos de un usuario */
  async enviarAUsuario(userId: string, payload: PushPayload): Promise<void> {
    const tokens = await this.prisma.pushToken.findMany({
      where: { userId, activo: true },
      select: { token: true },
    });

    if (tokens.length === 0) return;

    const mensajes = tokens.map((t) => ({
      to: t.token,
      sound: 'default',
      title: payload.titulo,
      body: payload.cuerpo,
      data: payload.data ?? {},
    }));

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensajes),
      });

      const result = (await response.json()) as any;

      // Desactivar tokens inválidos para no seguir enviando
      if (result?.data) {
        const datos = Array.isArray(result.data) ? result.data : [result.data];
        const tokensList = tokens.map((t) => t.token);

        for (let i = 0; i < datos.length; i++) {
          const item = datos[i];
          if (
            item?.status === 'error' &&
            (item?.details?.error === 'DeviceNotRegistered' ||
              item?.details?.error === 'InvalidCredentials')
          ) {
            await this.prisma.pushToken.updateMany({
              where: { token: tokensList[i] },
              data: { activo: false },
            }).catch(() => {});
          }
        }
      }
    } catch (err) {
      this.logger.warn(`Error enviando push a userId ${userId}: ${err}`);
    }
  }
}
