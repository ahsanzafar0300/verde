import {
  CreateHospital,
  HospitalRepositoryInterface,
} from "../interfaces/HospitalRepositoryInterface";

class HospitalService {
  private hospital: HospitalRepositoryInterface;

  constructor(hospital: HospitalRepositoryInterface) {
    this.hospital = hospital;
  }

  async getAllHospitals() {
    const hospitals = this.hospital.findHospitals();
    return hospitals;
  }

  async getSingleHospital(id: number) {
    const hospital = this.hospital.findSingleHospital(id);
    return hospital;
  }

  async createHospital(data: CreateHospital) {
    try {
      const hospital = this.hospital.createHospital(data);
      return hospital;
    } catch (error) {
      console.error("Error creating hospital:", error);
      throw new Error("Failed to create hospital");
    }
  }

  async getDoctorHospitals(id: number) {
    const hospitals = this.hospital.getDoctorHospitals(id);
    return hospitals;
  }
}

export default HospitalService;
