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

class DoctorsRepository implements DoctorsRepositoryInterface {
  async findDoctors() {
    const doctors = prisma.doctors.findMany();
    return doctors;
  }

  private async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
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

    const usersHashPassword = await this.generateHash(SALT, password);

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
    const { password, ...other } = data;
    const usersHashPassword = await this.generateHash(SALT, password);
    const userData = { ...other, password: usersHashPassword };
    return prisma.doctors.create({
      data: userData,
    });
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
}

export default DoctorsRepository;
