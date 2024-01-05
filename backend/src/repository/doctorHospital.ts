import { prisma } from "..";
import {
  CreateDoctorHospital,
  DoctorHospitalRepositoryInterface,
  RemoveDoctorHospital,
} from "../interfaces/DoctorHospitalRepositoryInterface";

class DoctorHospitalRepository implements DoctorHospitalRepositoryInterface {
  async createDoctorHospital(inputData: CreateDoctorHospital) {
    return prisma.doctorHospitals.create({
      data: inputData,
    });
  }

  async removeDoctorHospital(inputData: RemoveDoctorHospital) {
    return prisma.doctorHospitals.deleteMany({
      where: {
        doctor_id: inputData.doctor_id,
        hospital_id: inputData.hospital_id,
      },
    });
  }
}

export default DoctorHospitalRepository;
