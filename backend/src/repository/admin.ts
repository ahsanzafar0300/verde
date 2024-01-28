import { createHmac } from "node:crypto";
import { JWT_SECRET, SALT, prisma } from "..";
import {
  AdminRepositoryInterface,
  CreateAdmin,
  GetUserTokenPayload,
  UpdateAdmin,
} from "../interfaces/AdminRepositoryInterface";
import JWT from "jsonwebtoken";
import { USER_ROLES } from "../utils/roles";
import BaseRepository from "./baseRepository";
import { generateVerificationCode } from "../utils/helperFunctions";

class AdminRepository
  extends BaseRepository
  implements AdminRepositoryInterface
{
  constructor() {
    super();
  }
  async findAdmin() {
    return prisma.admin.findMany({});
  }

  async findAdminById(id: number) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async findAdminByEmail(email: string) {
    return prisma.admin.findFirst({ where: { email } });
  }

  async createAdmin(data: CreateAdmin) {
    try {
      const { password, ...other } = data;
      const usersHashPassword = await this.generateHash(SALT, password);
      const userData = { ...other, password: usersHashPassword };
      const createdAdmin = await prisma.admin.create({
        data: userData,
      });
      await super.sendEmailOnSignUp(userData?.email);
      return createdAdmin;
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw error;
    }
  }

  async getAdminToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findAdminByEmail(email);
    if (!user) {
      return {
        error: "Email does not exist!",
      };
    }
    const usersHashPassword = await this.generateHash(SALT, password);

    if (usersHashPassword !== user.password) {
      return {
        error: "Incorrect password!",
      };
    }

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

  async updateAdmin(id: number, data: UpdateAdmin) {
    return prisma.admin.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async adminForgotPassword(email: string, id: number) {
    const code = generateVerificationCode();
    const emailPromise = await super.sendEmailOnForgotPassword(email, code);
    if (emailPromise) {
      return this.updateAdmin(id, { verification_code: code });
    }
    return null;
  }

  async verifyAdminCode(code: string, id: number) {
    const admin = await this.findAdminById(id);
    if (code === admin?.verification_code) {
      return true;
    } else {
      return false;
    }
  }

  async updateAdminPassword(id: number, password: string) {
    const hashPassword = await super.generateHash(SALT, password);
    return prisma.admin.update({
      where: {
        id,
      },
      data: { password: hashPassword },
    });
  }
}

export default AdminRepository;
