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
  verification_code: string;
  verification_code_expiry?: number;
}

export interface UpdatePatient {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  gender?: string;
  is_verified?: boolean;
  verification_code?: string;
  verification_code_expiry?: number;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface ReturnUserTokenPayload {
  id: number;
  token: string;
  email: string;
  role: string;
}

export interface ReturnError {
  error: string;
}

export interface PatientsRepositoryInterface {
  findPatients(): Promise<Patient[]>;
  findPatientByEmail(email: string): Promise<Patient | null>;
  findPatientById(id: number): Promise<Patient | null>;
  createPatient(data: CreatePatient): Promise<Patient | ReturnError>;
  updatePatient(id: number, data: UpdatePatient): Promise<Patient>;
  updatePatientPassword(id: number, password: string): Promise<Patient>;
  getPatientToken(
    payload: GetUserTokenPayload
  ): Promise<ReturnUserTokenPayload | ReturnError>;
  patientForgotPassword(email: string, id: number): Promise<Patient | null>;
  verifyPatientCode(code: string, id: number): Promise<Boolean>;
}
