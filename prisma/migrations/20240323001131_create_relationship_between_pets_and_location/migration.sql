/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_organization_id_fkey";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizatons" (
    "id" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizatons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
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
    "location_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizatons_email_key" ON "organizatons"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizatons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
