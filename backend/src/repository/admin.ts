import { createHmac } from "node:crypto";
import { JWT_SECRET, SALT, prisma } from "..";
import {
  AdminRepositoryInterface,
  CreateAdmin,
  GetUserTokenPayload,
} from "../interfaces/AdminRepositoryInterface";
import JWT from "jsonwebtoken";
import { USER_ROLES } from "../utils/roles";

class AdminRepository implements AdminRepositoryInterface {
  async findAdmin() {
    return prisma.admin.findMany({});
  }

  private async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  async findAdminByEmail(email: string) {
    return prisma.admin.findFirst({ where: { email } });
  }

  async createAdmin(data: CreateAdmin) {
    const { password, ...other } = data;
    const usersHashPassword = await this.generateHash(SALT, password);
    const userData = { ...other, password: usersHashPassword };
    return prisma.admin.create({
      data: userData,
    });
  }

  async getAdminToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findAdminByEmail(email);
    if (!user) throw new Error("user not found");

    const usersHashPassword = await this.generateHash(SALT, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const returnValue = {
      token: token,
      email: email,
      role: USER_ROLES.admin,
    };
    return returnValue;
  }
}

export default AdminRepository;
