export interface CreateDoctor {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
}

export interface UpdateDoctor {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  gender?: string;
  is_verified?: boolean;
  verification_code?: string;
}

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
  is_verified: boolean;
  verification_code?: string;
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

export interface ReturnError {
  error: string;
}

export interface DoctorsRepositoryInterface {
  findDoctors(): Promise<Doctor[]>;
  findDoctorByEmail(email: string): Promise<Doctor | null>;
  findDoctorById(id: number): Promise<Doctor | null>;
  findDoctorsByIds(ids: number[]): Promise<Doctor[] | null>;
  createDoctor(data: CreateDoctor): Promise<Doctor | ReturnError>;
  updateDoctor(id: number, data: UpdateDoctor): Promise<Doctor>;
  getDoctorToken(
    payload: GetUserTokenPayload
  ): Promise<ReturnUserTokenPayload | ReturnError>;
  getSpecializationDoctors(id: number): Promise<Doctor[]>;
  getHospitalDoctors(id: number): Promise<Doctor[]>;
  updateDoctorPassword(id: number, password: string): Promise<Doctor>;
  doctorForgotPassword(email: string, id: number): Promise<Doctor | null>;
  verifyDoctorCode(code: string, id: number): Promise<Boolean>;
  doctorOTP(email: string): Promise<{ code: string } | null>;
  verifyDoctorOTP(code: string, hashCode: string): Promise<Boolean>;
}
