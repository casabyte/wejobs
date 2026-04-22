/*
  Warnings:

  - You are about to drop the column `ownerId` on the `companies` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerId` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_ownerId_fkey";

-- DropIndex
DROP INDEX "companies_ownerId_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "ownerId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "employerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
