export interface CreatePatient {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
  is_verified: boolean;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
  is_verified: boolean;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface ReturnUserTokenPayload {
  token: string;
  email: string;
  role: string;
}

export interface PatientsRepositoryInterface {
  findPatients(): Promise<Patient[]>;
  findPatientByEmail(email: string): Promise<Patient | null>;
  findPatientById(id: number): Promise<Patient | null>;
  createPatient(data: CreatePatient): Promise<Patient>;
  getPatientToken(
    payload: GetUserTokenPayload
  ): Promise<ReturnUserTokenPayload>;
}
