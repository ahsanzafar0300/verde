import _ from "lodash";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
import {
  CreateDoctor,
  DoctorsRepositoryInterface,
  GetUserTokenPayload,
  UpdateDoctor,
} from "../interfaces/DoctorsRepositoryInterface";
import { JWT_SECRET, SALT, prisma } from "..";
import { Specialization } from "../interfaces/SpecializationRepositoryInterface";
import { PrismaClient } from "@prisma/client";
import { USER_ROLES } from "../utils/roles";
import BaseRepository from "./baseRepository";
import { generateVerificationCode } from "../utils/helperFunctions";

class DoctorsRepository
  extends BaseRepository
  implements DoctorsRepositoryInterface
{
  constructor() {
    super();
  }
  async findDoctors() {
    const doctors = prisma.doctors.findMany();
    return doctors;
  }

  async findDoctorById(id: number) {
    return prisma.doctors.findUnique({
      where: { id },
      include: { doctorHospitals: true },
    });
  }

  async findDoctorByEmail(email: string) {
    return prisma.doctors.findFirst({ where: { email } });
  }

  async findDoctorsByIds(ids: number[]) {
    return prisma.doctors.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async updateDoctor(id: number, data: UpdateDoctor) {
    return prisma.doctors.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async getDoctorToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findDoctorByEmail(email);
    if (!user) throw new Error("user not found");

    const usersHashPassword = await super.generateHash(SALT, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = JWT.sign(
      { id: user.id, email: user.email, role: "doctor" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const returnValue = {
      token: token,
      email: email,
      role: USER_ROLES.doctor,
    };
    return returnValue;
  }

  async createDoctor(data: CreateDoctor) {
    try {
      const { password, ...other } = data;
      const usersHashPassword = await super.generateHash(SALT, password);
      const userData = { ...other, password: usersHashPassword };
      const createdDoctor = await prisma.doctors.create({
        data: userData,
      });
      await super.sendEmailOnSignUp(userData?.email);
      return createdDoctor;
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw error;
    }
  }

  async getSpecializationDoctors(id: number) {
    const doctorsArr = prisma.doctorSpecialization.findMany({
      where: { specialization_id: id },
      select: {
        doctor_id: true,
      },
    });
    const doctorsIds = await doctorsArr;
    const doctorsIdsArr = doctorsIds.map((item) => item.doctor_id);
    const doctors = await prisma.doctors.findMany({
      where: {
        id: {
          in: doctorsIdsArr,
        },
      },
    });
    return doctors;
  }

  async getHospitalDoctors(id: number) {
    const doctorsArr = prisma.doctorHospitals.findMany({
      where: { hospital_id: id },
      select: {
        doctor_id: true,
      },
    });
    const doctorIds = await doctorsArr;
    const doctorIdsArr = doctorIds.map((item) => item.doctor_id);
    const doctors = await prisma.doctors.findMany({
      where: {
        id: {
          in: doctorIdsArr,
        },
      },
    });

    return doctors;
  }

  async doctorForgotPassword(email: string, id: number) {
    const code = generateVerificationCode();
    const emailPromise = await super.sendEmailOnForgotPassword(email, code);
    if (emailPromise) {
      return this.updateDoctor(id, { verification_code: code });
    }
    return null;
  }

  async verifyDoctorCode(code: string, id: number) {
    const doctor = await this.findDoctorById(id);
    if (code === doctor?.verification_code) {
      return true;
    } else {
      return false;
    }
  }

  async updateDoctorPassword(id: number, password: string) {
    const hashPassword = await super.generateHash(SALT, password);
    return prisma.doctors.update({
      where: {
        id,
      },
      data: { password: hashPassword },
    });
  }
}

export default DoctorsRepository;
