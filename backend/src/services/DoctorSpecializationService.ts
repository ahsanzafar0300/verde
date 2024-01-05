import {
  CreateDoctorSpecialization,
  DoctorSpecializationRepositoryInterface,
} from "../interfaces/DoctorSpecializationInterface";

class DoctorSpecializationService {
  private doctorSpecialization: DoctorSpecializationRepositoryInterface;

  constructor(doctorSpecialization: DoctorSpecializationRepositoryInterface) {
    this.doctorSpecialization = doctorSpecialization;
  }

  async createDoctorSpecialization(data: CreateDoctorSpecialization) {
    try {
      return this.doctorSpecialization.createDoctorSpecialization(data);
    } catch (error) {
      console.error("Error creating doctorSpecialization:", error);
      throw new Error("Failed to create doctorSpecialization");
    }
  }
}

export default DoctorSpecializationService;
