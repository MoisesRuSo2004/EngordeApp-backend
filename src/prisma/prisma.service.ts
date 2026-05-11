import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

function createPrismaClient(): PrismaClient {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter } as any);
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient;

  constructor() {
    this.client = createPrismaClient();
  }

  // Proxy para que el resto del código use prismaService.lote.findMany() etc.
  get $transaction() { return this.client.$transaction.bind(this.client); }

  // Modelos generados por Prisma
  get finca() { return this.client.finca; }
  get proveedor() { return this.client.proveedor; }
  get lote() { return this.client.lote; }
  get animal() { return this.client.animal; }
  get pesaje() { return this.client.pesaje; }
  get gasto() { return this.client.gasto; }
  get precioMercado() { return this.client.precioMercado; }
  get alerta() { return this.client.alerta; }
  get perfil() { return this.client.perfil; }
  get pushToken() { return this.client.pushToken; }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
