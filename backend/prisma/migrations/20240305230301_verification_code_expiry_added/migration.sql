-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "verification_code_expiry" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "verification_code_expiry" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "verification_code_expiry" INTEGER NOT NULL DEFAULT 0;
