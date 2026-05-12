FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Instalar TODAS las deps (incluyendo devDeps) para poder compilar
RUN npm ci

# Generar Prisma client antes de compilar TypeScript
RUN npx prisma generate

# Copiar fuente
COPY . .

# Compilar — falla el build si dist/main.js no existe
RUN npx nest build && \
    echo "=== dist/ generado ===" && \
    ls -la dist/ && \
    test -f dist/main.js || (echo "ERROR: dist/main.js no existe" && exit 1)

# ─── Imagen de producción ───────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Solo deps de producción + generar Prisma client
RUN npm ci --omit=dev && npx prisma generate

# Copiar el output compilado desde la etapa de build
COPY --from=builder /app/dist ./dist

# Verificar que main.js llegó a la imagen final
RUN test -f dist/main.js && echo "dist/main.js OK" || (echo "ERROR: dist/main.js no llegó" && exit 1)

EXPOSE 3000

CMD ["node", "dist/main"]
