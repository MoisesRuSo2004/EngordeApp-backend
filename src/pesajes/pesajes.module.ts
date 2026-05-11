import { Module } from '@nestjs/common';
import { PesajesController } from './pesajes.controller';
import { PesajesService } from './pesajes.service';

@Module({
  controllers: [PesajesController],
  providers: [PesajesService],
  exports: [PesajesService],
})
export class PesajesModule {}
