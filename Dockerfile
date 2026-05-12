FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Instalar TODAS las deps (incluyendo devDeps) para poder compilar
RUN npm ci

# Generar Prisma client
RUN npx prisma generate

# Compilar con tsc directamente (más predecible que nest build + webpack)
RUN npx tsc -p tsconfig.build.json

# Mostrar qué se generó (diagnóstico)
RUN echo "=== Contenido de dist/ ===" && ls -la dist/ && echo "=== main.js ===" && test -f dist/main.js && echo "OK" || (echo "ERROR: dist/main.js no existe" && exit 1)

# ─── Imagen de producción ───────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Solo deps de producción + generar Prisma client
RUN npm ci --omit=dev && npx prisma generate

# Copiar el output compilado desde la etapa de build
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
