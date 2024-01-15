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
    const doctorHospital = await this.doctorHospital.createDoctorHospital(data);
    return doctorHospital;
  }

  async removeDoctorHospital(data: RemoveDoctorHospital) {
    const doctorHospital = await this.doctorHospital.removeDoctorHospital(data);
    return doctorHospital;
  }
}

export default DoctorHospitalService;
