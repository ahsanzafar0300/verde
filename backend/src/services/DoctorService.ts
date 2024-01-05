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
    const doctors = this.doctors.findDoctors();
    return doctors;
  }

  async findDoctorById(id: number) {
    const doctor = this.doctors.findDoctorById(id);
    return doctor;
  }

  async findDoctorsByIds(ids: number[]) {
    const doctors = this.doctors.findDoctorsByIds(ids);
    return doctors;
  }

  async findDoctorByEmail(email: string) {
    const doctor = this.doctors.findDoctorByEmail(email);
    return doctor;
  }

  async getDoctorToken(payload: GetUserTokenPayload) {
    const token = this.doctors.getDoctorToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  }

  async createDoctor(data: CreateDoctor) {
    try {
      return this.doctors.createDoctor(data);
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw new Error("Failed to create doctor");
    }
  }

  async updateDoctor(id: number, data: UpdateDoctor) {
    try {
      return this.doctors.updateDoctor(id, data);
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw new Error("Failed to update doctor");
    }
  }

  async getSpecializationDoctors(id: number) {
    const doctors = this.doctors.getSpecializationDoctors(id);
    return doctors;
  }

  async getHospitalDoctors(id: number) {
    const doctors = this.doctors.getHospitalDoctors(id);
    return doctors;
  }
}

export default DoctorService;
