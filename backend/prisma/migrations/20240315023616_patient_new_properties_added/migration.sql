-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "blood_group" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "insurance_id" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "other_history" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;
