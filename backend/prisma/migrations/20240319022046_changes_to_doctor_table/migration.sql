/*
  Warnings:

  - You are about to drop the column `about_me` on the `doctors` table. All the data in the column will be lost.
  - The `services` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specialization` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "about_me",
ADD COLUMN     "bibliography" VARCHAR(255) NOT NULL DEFAULT '',
DROP COLUMN "services",
ADD COLUMN     "services" VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR(50)[],
DROP COLUMN "specialization",
ADD COLUMN     "specialization" VARCHAR(50)[] DEFAULT ARRAY[]::VARCHAR(50)[];
