import { prisma } from "..";
import {
  CreateSpecialization,
  SpecializationRepositoryInterface,
} from "../interfaces/SpecializationRepositoryInterface";

class SpecializationRepository implements SpecializationRepositoryInterface {
  async findSpecializations() {
    const specializations = prisma.specialization.findMany();
    return specializations;
  }

  async findSpecializationById(id: number) {
    return prisma.specialization.findFirst({ where: { id } });
  }

  async createSpecialization(specializationData: CreateSpecialization) {
    return prisma.specialization.create({
      data: specializationData,
    });
  }

  async getDoctorSpecializations(id: number) {
    const specializationArr = prisma.doctorSpecialization.findMany({
      where: { doctor_id: id },
      select: {
        specialization_id: true,
      },
    });
    const specializationIds = await specializationArr;
    const specializationIdsArr = specializationIds.map(
      (item) => item.specialization_id
    );
    const specializations = await prisma.specialization.findMany({
      where: {
        id: {
          in: specializationIdsArr,
        },
      },
    });

    return specializations;
  }
}

export default SpecializationRepository;
