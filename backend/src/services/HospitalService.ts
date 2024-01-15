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
    const hospitals = await this.hospital.findHospitals();
    return hospitals;
  }

  async getSingleHospital(id: number) {
    const hospital = await this.hospital.findSingleHospital(id);
    return hospital;
  }

  async createHospital(data: CreateHospital) {
    const hospital = await this.hospital.createHospital(data);
    return hospital;
  }

  async getDoctorHospitals(id: number) {
    const hospitals = await this.hospital.getDoctorHospitals(id);
    return hospitals;
  }
}

export default HospitalService;
