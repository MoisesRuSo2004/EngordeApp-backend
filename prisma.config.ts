import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // URL directa (puerto 5432, sin pgBouncer) — requerida para migraciones DDL
    url: process.env.DIRECT_URL,
  },
});
