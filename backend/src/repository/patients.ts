import _ from "lodash";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
import {
  CreatePatient,
  GetUserTokenPayload,
  PatientsRepositoryInterface,
} from "../interfaces/PatientsRepositoryInterface";
import { JWT_SECRET, SALT, prisma } from "..";
import { USER_ROLES } from "../utils/roles";

class PatientsRepository implements PatientsRepositoryInterface {
  async findPatients() {
    return prisma.patients.findMany();
  }

  private async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  async findPatientById(id: number) {
    return prisma.patients.findUnique({ where: { id } });
  }

  async findPatientByEmail(email: string) {
    return prisma.patients.findFirst({ where: { email } });
  }

  async createPatient(data: CreatePatient) {
    const { password, ...other } = data;
    const usersHashPassword = await this.generateHash(SALT, password);
    const userData = { ...other, password: usersHashPassword };
    return prisma.patients.create({
      data: userData,
    });
  }

  async getPatientToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findPatientByEmail(email);
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
      role: USER_ROLES.patient,
    };
    return returnValue;
  }
}

export default PatientsRepository;
