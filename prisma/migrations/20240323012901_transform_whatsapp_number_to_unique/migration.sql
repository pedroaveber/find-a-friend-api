/*
  Warnings:

  - A unique constraint covering the columns `[whatsapp]` on the table `organizatons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizatons_whatsapp_key" ON "organizatons"("whatsapp");
