export interface CreatePatient {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
}

export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface PatientsRepositoryInterface {
  findPatients(): Promise<Patient[]>;
  findPatientByEmail(email: string): Promise<Patient | null>;
  createPatient(data: CreatePatient): Promise<Patient>;
  getPatientToken(payload: GetUserTokenPayload): Promise<string>;
}
