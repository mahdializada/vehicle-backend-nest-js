-- CreateEnum
CREATE TYPE "vehicles_tax_status_enum" AS ENUM ('No', 'Yes', 'Pending');

-- CreateEnum
CREATE TYPE "vehicles_halfcut_status_enum" AS ENUM ('Complete', 'Halfcut', 'Dismantled');

-- CreateEnum
CREATE TYPE "vehicles_load_status_enum" AS ENUM ('Pending', 'Loaded', 'In_Transit', 'Delivered');

-- CreateEnum
CREATE TYPE "vehicles_load_halfcut_status_enum" AS ENUM ('NotApplicable', 'Complete', 'Incomplete');

-- CreateEnum
CREATE TYPE "vehicles_title_tracking_enum" AS ENUM ('NotStarted', 'InProgress', 'Completed', 'Delivered');

-- CreateEnum
CREATE TYPE "vehicles_inspection_enum" AS ENUM ('NotInspected', 'Inspected', 'Failed');

-- CreateEnum
CREATE TYPE "vehicle_dispatch_type" AS ENUM ('dispatch', 'non_dispatch');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "vin" VARCHAR(255),
    "lot_number" VARCHAR(255),
    "year" VARCHAR(128),
    "make" VARCHAR(255),
    "model" VARCHAR(255),
    "price" INTEGER DEFAULT 0,
    "title_number" VARCHAR(255),
    "color" VARCHAR(128),
    "isPendingTrash" BOOLEAN NOT NULL DEFAULT false,
    "is_scrap" BOOLEAN NOT NULL DEFAULT false,
    "tax_status" "vehicles_tax_status_enum" NOT NULL DEFAULT 'No',
    "load_status" "vehicles_load_status_enum",
    "inspection" "vehicles_inspection_enum",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_remark" TEXT,
    "company_id" INTEGER,
    "customer_id" INTEGER,
    "title_status_step_two" VARCHAR(255),
    "last_title_follow_up_date" DATE DEFAULT CURRENT_TIMESTAMP,
    "title_receive_date" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "contact" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vin_key" ON "vehicles"("vin");

-- CreateIndex
CREATE INDEX "vehicles_vin_idx" ON "vehicles"("vin");

-- CreateIndex
CREATE INDEX "vehicles_company_id_idx" ON "vehicles"("company_id");

-- CreateIndex
CREATE INDEX "vehicles_customer_id_idx" ON "vehicles"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
