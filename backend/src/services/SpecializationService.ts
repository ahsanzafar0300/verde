import {
  CreateSpecialization,
  SpecializationRepositoryInterface,
} from "../interfaces/SpecializationRepositoryInterface";

class SpecializationService {
  private specialization: SpecializationRepositoryInterface;

  constructor(specialization: SpecializationRepositoryInterface) {
    this.specialization = specialization;
  }

  async getAllSpecializations() {
    const specializations = await this.specialization.findSpecializations();
    return specializations;
  }

  async findSpecializationById(id: number) {
    const specialization = await this.specialization.findSpecializationById(id);
    return specialization;
  }

  async createSpecialization(data: CreateSpecialization) {
    const specialization = await this.specialization.createSpecialization(data);
    return specialization;
  }

  async getDoctorSpecializations(id: number) {
    const specializations = await this.specialization.getDoctorSpecializations(
      id
    );
    return specializations;
  }
}

export default SpecializationService;
