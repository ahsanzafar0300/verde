/*
  Warnings:

  - You are about to drop the column `verification_code` on the `userOtp` table. All the data in the column will be lost.
  - You are about to drop the column `verification_code_expiry` on the `userOtp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userOtp" DROP COLUMN "verification_code",
DROP COLUMN "verification_code_expiry",
ADD COLUMN     "otp" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "otp_expiry" INTEGER NOT NULL DEFAULT 0;
