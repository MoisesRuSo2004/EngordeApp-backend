FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalar TODAS las deps (incluyendo devDeps) para poder compilar
RUN npm ci

# Generar Prisma client
RUN npx prisma generate

# Copiar fuente y compilar
COPY . .
RUN npx nest build

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
