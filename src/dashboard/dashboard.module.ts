import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { RentabilidadService } from './rentabilidad.service';
import { ResumenService } from './resumen.service';
import { PesajesModule } from '../pesajes/pesajes.module';
import { GastosModule } from '../gastos/gastos.module';

@Module({
  imports: [PesajesModule, GastosModule],
  controllers: [DashboardController],
  providers: [RentabilidadService, ResumenService],
  exports: [RentabilidadService, ResumenService],
})
export class DashboardModule {}
