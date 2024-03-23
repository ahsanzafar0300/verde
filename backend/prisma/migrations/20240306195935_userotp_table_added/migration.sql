-- CreateTable
CREATE TABLE "userOtp" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "verification_code" VARCHAR(50) NOT NULL DEFAULT '',
    "verification_code_expiry" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "userOtp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userOtp_email_key" ON "userOtp"("email");
