import { prisma } from "..";
import { UserOtpRepositoryInterface } from "../interfaces/UserOtpRepositoryInterface";
import { generateVerificationCode } from "../utils/helperFunctions";
import BaseRepository from "./baseRepository";

class UserOtpRepository
  extends BaseRepository
  implements UserOtpRepositoryInterface
{
  async createUserOtp(email: string, role: string) {
    try {
      const code = generateVerificationCode();
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const otpExpiryTime = currentTime + 5 * 60;
      const userData = { email, otp: code, role, otp_expiry: otpExpiryTime };
      const res = await prisma.userOtp.create({ data: userData });
      const emailPromise = await super.sendEmailOTP(email, code);
      return res;
    } catch (error) {
      return null;
    }
  }

  async verifyUserOtp(email: string, role: string, code: string) {
    try {
      const res = await prisma.userOtp.findFirst({ where: { email, role } });
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (res?.otp_expiry! > currentTime) {
        if (code === res?.otp) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  }
}

export default UserOtpRepository;
