-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "verification_code_expiry" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "verification_code_expiry" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "verification_code_expiry" SET DATA TYPE BIGINT;
