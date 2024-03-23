import {
  DoctorsRepositoryInterface,
  CreateDoctor,
  GetUserTokenPayload,
  UpdateDoctor,
} from "../interfaces/DoctorsRepositoryInterface";

class DoctorService {
  private doctors: DoctorsRepositoryInterface;

  constructor(doctors: DoctorsRepositoryInterface) {
    this.doctors = doctors;
  }

  async getAllDoctors() {
    const doctors = await this.doctors.findDoctors();
    return doctors;
  }

  async findDoctorById(id: number) {
    const doctor = await this.doctors.findDoctorById(id);
    return doctor;
  }

  async findDoctorsByIds(ids: number[]) {
    const doctors = await this.doctors.findDoctorsByIds(ids);
    return doctors;
  }

  async findDoctorByEmail(email: string) {
    const doctor = await this.doctors.findDoctorByEmail(email);
    return doctor;
  }

  async getDoctorToken(payload: GetUserTokenPayload) {
    const token = await this.doctors.getDoctorToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  }

  async createDoctor(data: CreateDoctor) {
    const doctor = await this.doctors.createDoctor(data);
    return doctor;
  }

  async updateDoctor(id: number, data: UpdateDoctor) {
    const updatedDoctor = await this.doctors.updateDoctor(id, data);
    return updatedDoctor;
  }

  async getSpecializationDoctors(id: number) {
    const doctors = await this.doctors.getSpecializationDoctors(id);
    return doctors;
  }

  async getHospitalDoctors(id: number) {
    const doctors = await this.doctors.getHospitalDoctors(id);
    return doctors;
  }

  async updateDoctorPassword(id: number, password: string) {
    const doctor = await this.doctors.updateDoctorPassword(id, password);
    return doctor;
  }

  async doctorForgotPassword(email: string, id: number) {
    const doctor = await this.doctors.doctorForgotPassword(email, id);
    return doctor;
  }

  async verifyDoctorCode(code: string, id: number) {
    const verificationCode = await this.doctors.verifyDoctorCode(code, id);
    return verificationCode;
  }
}

export default DoctorService;
