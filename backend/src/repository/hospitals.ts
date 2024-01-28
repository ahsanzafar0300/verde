import { prisma } from "..";
import {
  CreateHospital,
  Hospital,
  HospitalRepositoryInterface,
} from "../interfaces/HospitalRepositoryInterface";
import BaseRepository from "./baseRepository";

class HospitalsRepository
  extends BaseRepository
  implements HospitalRepositoryInterface
{
  constructor() {
    super();
  }

  async findHospitals() {
    // const decoded = await super.verifyToken(token);
    const hospitals = prisma.hospitals.findMany();
    return hospitals;
  }

  async findSingleHospital(id: number) {
    const hospital = prisma.hospitals.findFirst({
      where: {
        id,
      },
      include: {
        doctorHospitals: true,
      },
    });
    return hospital;
  }

  async createHospital(hospitalData: CreateHospital) {
    return prisma.hospitals.create({
      data: hospitalData,
    });
  }

  async getDoctorHospitals(id: number) {
    const hospitalArr = prisma.doctorHospitals.findMany({
      where: { doctor_id: id },
      select: {
        hospital_id: true,
      },
    });
    const hospitalIds = await hospitalArr;
    const hospitalIdsArr = hospitalIds.map((item) => item.hospital_id);
    const hospitals = await prisma.hospitals.findMany({
      where: {
        id: {
          in: hospitalIdsArr,
        },
      },
    });

    return hospitals;
  }
}

export default HospitalsRepository;
