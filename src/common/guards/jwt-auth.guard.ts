import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.slice(7);
    const supabaseUrl = this.config.get<string>('SUPABASE_URL');

    if (!supabaseUrl) {
      throw new UnauthorizedException('Configuración de auth incompleta');
    }

    try {
      // Dynamic import para compatibilidad ESM en Vercel (CommonJS bundle)
      const { createRemoteJWKSet, jwtVerify } = await import('jose');

      const JWKS = createRemoteJWKSet(
        new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`),
      );

      const { payload } = await jwtVerify(token, JWKS);

      if (!payload.sub) {
        throw new UnauthorizedException('Token inválido');
      }

      request.user = {
        sub: payload.sub,
        email: payload['email'] ?? '',
        role: payload['role'] ?? 'authenticated',
      };

      return true;
    } catch (err: any) {
      if (err instanceof UnauthorizedException) throw err;
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
