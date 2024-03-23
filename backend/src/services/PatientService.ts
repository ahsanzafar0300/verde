import {
  PatientsRepositoryInterface,
  CreatePatient,
  GetUserTokenPayload,
  UpdatePatient,
} from "../interfaces/PatientsRepositoryInterface";

class PatientService {
  private patients: PatientsRepositoryInterface;

  constructor(patients: PatientsRepositoryInterface) {
    this.patients = patients;
  }

  async getAllPatients() {
    const patients = await this.patients.findPatients();
    return patients;
  }

  async findPatientById(id: number) {
    const patient = await this.patients.findPatientById(id);
    return patient;
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
    const patient = await this.patients.createPatient(data);
    return patient;
  }

  async updatePatient(id: number, data: UpdatePatient) {
    const patient = await this.patients.updatePatient(id, data);
    return patient;
  }

  async updatePatientPassword(id: number, password: string) {
    const patient = await this.patients.updatePatientPassword(id, password);
    return patient;
  }

  async patientForgotPassword(email: string, id: number) {
    const patient = await this.patients.patientForgotPassword(email, id);
    return patient;
  }

  async verifyPatientCode(code: string, id: number) {
    const verificationCode = await this.patients.verifyPatientCode(code, id);
    return verificationCode;
  }

  // async patientOTP(email: string) {
  //   const patient = await this.patients.patientOTP(email);
  //   return patient;
  // }

  // async verifyPatientOTP(code: string, hashCode: string) {
  //   const verificationCode = await this.patients.verifyPatientOTP(
  //     code,
  //     hashCode
  //   );
  //   return verificationCode;
  // }
}

export default PatientService;
