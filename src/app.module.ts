import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FincasModule } from './fincas/fincas.module';
import { LotesModule } from './lotes/lotes.module';
import { AnimalesModule } from './animales/animales.module';
import { PesajesModule } from './pesajes/pesajes.module';
import { GastosModule } from './gastos/gastos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DispositivosModule } from './dispositivos/dispositivos.module';
import { PerfilesModule } from './perfiles/perfiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    NotificationsModule,
    DispositivosModule,
    PerfilesModule,
    FincasModule,
    LotesModule,
    AnimalesModule,
    PesajesModule,
    GastosModule,
    DashboardModule,
    ProveedoresModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AppModule {}
