/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceType` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AdminNote" ADD COLUMN     "entityType" TEXT;

-- AlterTable
ALTER TABLE "public"."Consultation" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "meetingLink" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "serviceType" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "public"."Document" ADD COLUMN     "outsourcingId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "public"."Resource" ADD COLUMN     "adminOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "creatorId" INTEGER,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_outsourcingId_fkey" FOREIGN KEY ("outsourcingId") REFERENCES "public"."OutsourcingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminNote" ADD CONSTRAINT "AdminNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
