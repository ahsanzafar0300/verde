import _ from "lodash";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
import {
  CreatePatient,
  GetUserTokenPayload,
  PatientsRepositoryInterface,
  UpdatePatient,
} from "../interfaces/PatientsRepositoryInterface";
import { JWT_SECRET, SALT, prisma } from "..";
import { USER_ROLES } from "../utils/roles";
import BaseRepository from "./baseRepository";
import { generateVerificationCode } from "../utils/helperFunctions";

class PatientsRepository
  extends BaseRepository
  implements PatientsRepositoryInterface
{
  constructor() {
    super();
  }
  async findPatients() {
    return prisma.patients.findMany();
  }

  async findPatientById(id: number) {
    return prisma.patients.findUnique({ where: { id } });
  }

  async findPatientByEmail(email: string) {
    return prisma.patients.findFirst({ where: { email } });
  }

  async createPatient(data: CreatePatient) {
    try {
      const { password, ...other } = data;
      const usersHashPassword = await super.generateHash(SALT, password);
      const userData = { ...other, password: usersHashPassword };
      const createdPatient = await prisma.patients.create({
        data: userData,
      });
      await super.sendEmailOnSignUp(userData?.email);
      return createdPatient;
    } catch (error) {
      console.error("Error creating patient:", error);
      throw error;
    }
  }

  async updatePatient(id: number, data: UpdatePatient) {
    return prisma.patients.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async updatePatientPassword(id: number, password: string) {
    const hashPassword = await super.generateHash(SALT, password);
    return prisma.patients.update({
      where: {
        id,
      },
      data: { password: hashPassword },
    });
  }

  async getPatientToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findPatientByEmail(email);
    if (!user) throw new Error("user not found");

    const usersHashPassword = await super.generateHash(SALT, password);

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

  async patientForgotPassword(email: string, id: number) {
    const code = generateVerificationCode();
    const emailPromise = await super.sendEmailOnForgotPassword(email, code);
    if (emailPromise) {
      return this.updatePatient(id, { verification_code: code });
    }
    return null;
  }

  async verifyPatientCode(code: string, id: number) {
    const patient = await this.findPatientById(id);
    if (code === patient?.verification_code) {
      return true;
    } else {
      return false;
    }
  }
}

export default PatientsRepository;
