export interface UserOtp {
  id: number;
  email: string;
  role: string;
  otp: string;
  otp_expiry: number;
}

export interface UserOtpRepositoryInterface {
  createUserOtp(email: string, role: string): Promise<UserOtp | null>;
  verifyUserOtp(
    email: string,
    role: string,
    code: string
  ): Promise<Boolean | null>;
}
