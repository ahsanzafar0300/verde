import _ from "lodash";
import {
  DoctorsRepositoryInterface,
  CreateDoctor,
  GetUserTokenPayload,
} from "../interfaces/DoctorsRepositoryInterface";

class DoctorService {
  private doctors: DoctorsRepositoryInterface;

  constructor(doctors: DoctorsRepositoryInterface) {
    this.doctors = doctors;
  }

  async getAllDoctors() {
    return this.doctors.findDoctors();
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
    try {
      return this.doctors.createDoctor(data);
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw new Error("Failed to create doctor");
    }
  }
}

export default DoctorService;
