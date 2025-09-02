-- CreateTable
CREATE TABLE "public"."OutsourcingRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "organizationName" TEXT NOT NULL,
    "coreFunctions" TEXT,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "services" TEXT[],
    "natureOfOutsourcing" TEXT NOT NULL,
    "budgetRange" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutsourcingRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OutsourcingRequest" ADD CONSTRAINT "OutsourcingRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
