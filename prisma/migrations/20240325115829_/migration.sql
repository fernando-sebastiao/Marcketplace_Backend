-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendente', 'andamento', 'cancelada', 'finalizada');

-- CreateEnum
CREATE TYPE "ClientRole" AS ENUM ('residencial', 'comercial');

-- CreateEnum
CREATE TYPE "FilialStatus" AS ENUM ('aberta', 'fechado');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('superGerente', 'gerente');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('npago', 'pago');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('On', 'Off');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "manager" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "sexo" "Sexo" NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "senha" TEXT NOT NULL DEFAULT '0000',
    "role" "RoleEnum" NOT NULL DEFAULT 'gerente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL,
    "manager_id" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(12) NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "FilialStatus" NOT NULL DEFAULT 'fechado',
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculo" (
    "id" TEXT NOT NULL,
    "matricula" VARCHAR(11) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "filial_id" TEXT NOT NULL,
    "veiculo_id" TEXT,
    "numberBI" VARCHAR(13) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "status" "DriverStatus" NOT NULL DEFAULT 'Off',
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "senha" TEXT NOT NULL DEFAULT '0000',
    "telefone" VARCHAR(12) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "agentId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "number_bi" VARCHAR(13) NOT NULL,
    "tel" VARCHAR(12) NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "role" "ClientRole" NOT NULL DEFAULT 'comercial',
    "avatar" TEXT,
    "address" TEXT NOT NULL,
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "status" "PaymentStatus" NOT NULL DEFAULT 'npago',
    "nascimento" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agents" (
    "id" TEXT NOT NULL,
    "filialId" TEXT NOT NULL,
    "avatar" TEXT,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "telefone" VARCHAR(9),
    "senha" TEXT NOT NULL DEFAULT '0000',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recolha" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "motorista_id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendente',
    "distance" TEXT,
    "duration" TEXT,
    "directions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recolha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manager_email_key" ON "manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "manager_telefone_key" ON "manager"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Filial_manager_id_key" ON "Filial"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "Filial_name_key" ON "Filial"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Filial_telefone_key" ON "Filial"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Filial_address_key" ON "Filial"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Filial_email_key" ON "Filial"("email");

-- CreateIndex
CREATE UNIQUE INDEX "veiculo_matricula_key" ON "veiculo"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "driver_code_key" ON "driver"("code");

-- CreateIndex
CREATE UNIQUE INDEX "driver_veiculo_id_key" ON "driver"("veiculo_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_numberBI_key" ON "driver"("numberBI");

-- CreateIndex
CREATE UNIQUE INDEX "driver_email_key" ON "driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver_telefone_key" ON "driver"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_number_bi_key" ON "Client"("number_bi");

-- CreateIndex
CREATE UNIQUE INDEX "Client_tel_key" ON "Client"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_email_key" ON "Agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_telefone_key" ON "Agents"("telefone");

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_veiculo_id_fkey" FOREIGN KEY ("veiculo_id") REFERENCES "veiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "Filial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "pagamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "Filial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agents" ADD CONSTRAINT "Agents_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolha" ADD CONSTRAINT "Recolha_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolha" ADD CONSTRAINT "Recolha_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolha" ADD CONSTRAINT "Recolha_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "Filial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
