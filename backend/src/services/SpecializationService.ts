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
    const specializations = this.specialization.findSpecializations();
    return specializations;
  }

  async findSpecializationById(id: number) {
    const specialization = this.specialization.findSpecializationById(id);
    return specialization;
  }

  async createSpecialization(data: CreateSpecialization) {
    try {
      return this.specialization.createSpecialization(data);
    } catch (error) {
      console.error("Error creating specialization:", error);
      throw new Error("Failed to create specialization");
    }
  }

  async getDoctorSpecializations(id: number) {
    const specializations = this.specialization.getDoctorSpecializations(id);
    return specializations;
  }
}

export default SpecializationService;
