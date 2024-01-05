import { prisma } from "..";
import {
  CreateDoctorSpecialization,
  DoctorSpecializationRepositoryInterface,
} from "../interfaces/DoctorSpecializationInterface";

class DoctorSpecializationRepository
  implements DoctorSpecializationRepositoryInterface
{
  async createDoctorSpecialization(inputData: CreateDoctorSpecialization) {
    return prisma.doctorSpecialization.create({
      data: inputData,
    });
  }
}

export default DoctorSpecializationRepository;
