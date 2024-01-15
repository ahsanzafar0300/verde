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
    const doctorSpecialization =
      await this.doctorSpecialization.createDoctorSpecialization(data);
    return doctorSpecialization;
  }
}

export default DoctorSpecializationService;
