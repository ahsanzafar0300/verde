/*
  Warnings:

  - You are about to alter the column `verification_code_expiry` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `verification_code_expiry` on the `doctors` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `verification_code_expiry` on the `patients` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "verification_code_expiry" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "verification_code_expiry" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "verification_code_expiry" SET DATA TYPE INTEGER;
