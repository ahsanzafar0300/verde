-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "verification_code" VARCHAR(50) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "verification_code" VARCHAR(50) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "verification_code" VARCHAR(50) NOT NULL DEFAULT '';
