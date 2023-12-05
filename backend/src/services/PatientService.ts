import _ from "lodash";
import {
  PatientsRepositoryInterface,
  CreatePatient,
  GetUserTokenPayload,
} from "../interfaces/PatientsRepositoryInterface";

class PatientService {
  private patients: PatientsRepositoryInterface;

  constructor(patients: PatientsRepositoryInterface) {
    this.patients = patients;
  }

  async getAllPatients() {
    return this.patients.findPatients();
  }

  async findPatientByEmail(email: string) {
    const patient = await this.patients.findPatientByEmail(email);
    return patient;
  }

  async getPatientToken(payload: GetUserTokenPayload) {
    const token = await this.patients.getPatientToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  }

  async createPatient(data: CreatePatient) {
    try {
      return this.patients.createPatient(data);
    } catch (error) {
      console.error("Error creating patient:", error);
      throw new Error("Failed to create patient");
    }
  }
}

export default PatientService;
