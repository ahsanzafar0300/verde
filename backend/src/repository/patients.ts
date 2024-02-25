import _ from "lodash";
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
      const { password, email, ...other } = data;
      const user = await this.findPatientByEmail(email);
      if (user) {
        return {
          error: "Email already exists!",
        };
      }
      const usersHashPassword = await super.generateHash(SALT, password);
      const userData = { ...other, email, password: usersHashPassword };
      const createdPatient = await prisma.patients.create({
        data: userData,
      });
      await super.sendEmailOnSignUp(userData?.email);
      return createdPatient;
    } catch (error) {
      return {
        error: "Patient could not be created!",
      };
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
    if (!user) {
      return {
        error: "Invalid Email or Password!",
      };
    }
    const usersHashPassword = await super.generateHash(SALT, password);
    if (usersHashPassword !== user.password) {
      return {
        error: "Invalid Email or Password!",
      };
    }
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

  async patientOTP(email: string) {
    const code = generateVerificationCode();
    const emailPromise = await super.sendEmailOTP(email, code);
    if (emailPromise) {
      const hashCode = await super.generateHash(SALT, code);
      return {
        code: hashCode,
      };
    }
    return null;
  }

  async verifyPatientOTP(code: string, hashCode: string) {
    const inputCode = await super.generateHash(SALT, code);
    if (inputCode === hashCode) {
      return true;
    } else {
      return false;
    }
  }
}

export default PatientsRepository;
