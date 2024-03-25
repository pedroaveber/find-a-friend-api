-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TOY', 'SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age_group" "AgeGroup" NOT NULL,
    "size" "Size" NOT NULL,
    "images" TEXT[],
    "requirements" TEXT[],
    "independency_level" "IndependencyLevel" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
