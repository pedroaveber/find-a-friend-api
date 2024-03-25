/*
  Warnings:

  - You are about to drop the column `location_id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_location_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "location_id",
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "locations";
