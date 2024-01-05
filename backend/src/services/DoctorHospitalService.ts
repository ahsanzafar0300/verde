import {
  CreateDoctorHospital,
  DoctorHospitalRepositoryInterface,
  RemoveDoctorHospital,
} from "../interfaces/DoctorHospitalRepositoryInterface";

class DoctorHospitalService {
  private doctorHospital: DoctorHospitalRepositoryInterface;

  constructor(doctorHospital: DoctorHospitalRepositoryInterface) {
    this.doctorHospital = doctorHospital;
  }

  async createDoctorHospital(data: CreateDoctorHospital) {
    try {
      return this.doctorHospital.createDoctorHospital(data);
    } catch (error) {
      console.error("Error creating doctorHospital:", error);
      throw new Error("Failed to create doctorHospital");
    }
  }

  async removeDoctorHospital(data: RemoveDoctorHospital) {
    try {
      return this.doctorHospital.removeDoctorHospital(data);
    } catch (error) {
      console.error("Error removing doctorHospital:", error);
      throw new Error("Failed to delete doctorHospital");
    }
  }
}

export default DoctorHospitalService;
