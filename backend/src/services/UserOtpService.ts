import { UserOtpRepositoryInterface } from "../interfaces/UserOtpRepositoryInterface";

class UserOtpService {
  private userOtp: UserOtpRepositoryInterface;

  constructor(userOtp: UserOtpRepositoryInterface) {
    this.userOtp = userOtp;
  }

  async createUserOtp(email: string, role: string) {
    const userOtp = await this.userOtp.createUserOtp(email, role);
    return userOtp;
  }

  async verifyUserOtp(email: string, role: string, code: string) {
    const userOtp = await this.userOtp.verifyUserOtp(email, role, code);
    return userOtp;
  }
}

export default UserOtpService;
