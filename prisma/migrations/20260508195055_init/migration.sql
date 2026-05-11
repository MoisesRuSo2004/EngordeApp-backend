-- CreateEnum
CREATE TYPE "EstadoAnimal" AS ENUM ('ACTIVO', 'VENDIDO', 'MUERTO', 'TRANSFERIDO');

-- CreateEnum
CREATE TYPE "EstadoLote" AS ENUM ('ACTIVO', 'ARCHIVADO');

-- CreateEnum
CREATE TYPE "CategoriaGasto" AS ENUM ('ALIMENTACION', 'MEDICAMENTOS', 'TRANSPORTE', 'MANO_DE_OBRA', 'ARRENDAMIENTO', 'OTROS');

-- CreateEnum
CREATE TYPE "FuentePrecioMercado" AS ENUM ('MANUAL', 'AUTOMATICO');

-- CreateEnum
CREATE TYPE "TipoAlerta" AS ENUM ('PESAJE_PENDIENTE', 'CRECIMIENTO_LENTO', 'BUEN_MOMENTO_VENTA', 'GASTO_ELEVADO', 'VACUNA_PROXIMA', 'PRECIO_SIN_ACTUALIZAR');

-- CreateTable
CREATE TABLE "fincas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fincas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "municipio" TEXT,
    "historial_calificacion" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "finca_id" TEXT NOT NULL,
    "proveedor_id" TEXT,
    "estado" "EstadoLote" NOT NULL DEFAULT 'ACTIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animales" (
    "id" TEXT NOT NULL,
    "lote_id" TEXT NOT NULL,
    "foto_url" TEXT,
    "peso_inicial_kg" DOUBLE PRECISION NOT NULL,
    "precio_compra_cop" INTEGER NOT NULL,
    "raza" TEXT,
    "edad_meses" INTEGER,
    "arete" TEXT,
    "estado" "EstadoAnimal" NOT NULL DEFAULT 'ACTIVO',
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesajes" (
    "id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "lote_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "peso_kg" DOUBLE PRECISION NOT NULL,
    "foto_url" TEXT,
    "nota" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pesajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gastos" (
    "id" TEXT NOT NULL,
    "lote_id" TEXT NOT NULL,
    "animal_id" TEXT,
    "categoria" "CategoriaGasto" NOT NULL,
    "monto_cop" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precio_mercado" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "precio_kilo_cop" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "fuente" "FuentePrecioMercado" NOT NULL DEFAULT 'MANUAL',
    "departamento" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "precio_mercado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lote_id" TEXT,
    "animal_id" TEXT,
    "tipo" "TipoAlerta" NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alertas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_finca_id_fkey" FOREIGN KEY ("finca_id") REFERENCES "fincas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animales" ADD CONSTRAINT "animales_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesajes" ADD CONSTRAINT "pesajes_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesajes" ADD CONSTRAINT "pesajes_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
