import { createHmac } from "node:crypto";
import { mailTransporter } from "../utils/nodemailerConfig";

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
}

export default BaseRepository;
