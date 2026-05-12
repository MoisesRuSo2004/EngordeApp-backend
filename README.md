# EngordeApp — Backend

API REST para la app de control de engorde ganadero. Construida con **NestJS + Prisma + Supabase**.

## Stack

- **NestJS** — Framework backend
- **Prisma** — ORM con PostgreSQL (Supabase)
- **Supabase** — Auth (JWT/JWKS) + Base de datos
- **Railway** — Despliegue en producción

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NODE_ENV=development
PORT=3000
```

## Desarrollo local

```bash
npm install
npx prisma generate
npm run start:dev
```

La API corre en `http://localhost:3000/api`

## Módulos

| Módulo | Descripción |
|---|---|
| `auth` | Validación JWT via JWKS de Supabase |
| `fincas` | Gestión de fincas por usuario |
| `lotes` | Lotes de engorde |
| `animales` | Registro de animales, compras y ventas |
| `pesajes` | Historial de pesajes |
| `gastos` | Gastos por lote |
| `dashboard` | Resumen y métricas de rentabilidad |
| `perfiles` | Usuarios con username personalizado |
| `dispositivos` | Tokens de push notifications |
| `notifications` | Envío de alertas push via Expo |
