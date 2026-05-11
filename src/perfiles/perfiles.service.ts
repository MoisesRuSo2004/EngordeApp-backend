import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerfilesService {
  constructor(private prisma: PrismaService) {}

  /** Comprueba si un username ya está tomado */
  async checkDisponible(username: string): Promise<{ disponible: boolean }> {
    const existe = await this.prisma.perfil.findUnique({
      where: { username: username.toLowerCase() },
    });
    return { disponible: !existe };
  }

  /** Crea el perfil al registrarse (endpoint público) */
  async crear(userId: string, username: string, email: string) {
    const usernameLower = username.toLowerCase();

    const conflicto = await this.prisma.perfil.findFirst({
      where: { OR: [{ username: usernameLower }, { email }] },
    });

    if (conflicto?.username === usernameLower) {
      throw new ConflictException('Ese nombre de usuario ya está en uso');
    }
    if (conflicto?.email === email) {
      throw new ConflictException('Ya existe una cuenta con ese correo');
    }

    return this.prisma.perfil.create({
      data: { userId, username: usernameLower, email },
    });
  }

  /** Resuelve username → email (para el login) */
  async resolverEmail(username: string): Promise<{ email: string }> {
    const perfil = await this.prisma.perfil.findUnique({
      where: { username: username.toLowerCase() },
      select: { email: true },
    });
    if (!perfil) throw new NotFoundException('Usuario no encontrado');
    return { email: perfil.email };
  }

  /** Actualiza el username (requiere JWT). Crea el perfil si aún no existe. */
  async actualizarUsername(userId: string, nuevoUsername: string, email: string) {
    const lower = nuevoUsername.toLowerCase();

    // Verificar que el username no esté tomado por OTRO usuario
    const conflicto = await this.prisma.perfil.findUnique({ where: { username: lower } });
    if (conflicto && conflicto.userId !== userId) {
      throw new ConflictException('Ese nombre de usuario ya está en uso');
    }

    return this.prisma.perfil.upsert({
      where: { userId },
      update: { username: lower },
      create: { userId, username: lower, email },
    });
  }

  /** Obtiene el perfil del usuario autenticado */
  obtenerPorUserId(userId: string) {
    return this.prisma.perfil.findUnique({ where: { userId } });
  }
}
