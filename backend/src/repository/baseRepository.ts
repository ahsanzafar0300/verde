import { createHmac } from "node:crypto";
import { mailTransporter } from "../utils/nodemailerConfig";
import JWT from "jsonwebtoken";
import { JWT_SECRET, prisma } from "..";

class BaseRepository {
  async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  async sendEmailOnSignUp(receiverEmail: string) {
    try {
      const info = await mailTransporter.sendMail({
        from: "mehdizaffar0@gmail.com",
        to: receiverEmail,
        subject: "Verde SignUp",
        text: "Welcome onboard!",
        html: "<b>Welcome onboard on Verde!</b>",
      });
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendEmailOTP(receiverEmail: string, code: string) {
    try {
      const info = await mailTransporter.sendMail({
        from: "mehdizaffar0@gmail.com",
        to: receiverEmail,
        subject: "Verify OTP",
        html: `<p>Here is your OTP: </p><b>${code}</b>`,
      });
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendEmailOnForgotPassword(receiverEmail: string, code: string) {
    try {
      const info = await mailTransporter.sendMail({
        from: "mehdizaffar0@gmail.com",
        to: receiverEmail,
        subject: "Forgot Password",
        html: `<b>Here is your code: ${code}</b>`,
      });

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

export default BaseRepository;
