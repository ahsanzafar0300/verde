export interface CreateDoctor {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
}

export interface Doctor {
  doctor_id: number;
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

export interface DoctorsRepositoryInterface {
  findDoctors(): Promise<Doctor[]>;
  findDoctorByEmail(email: string): Promise<Doctor | null>;
  createDoctor(data: CreateDoctor): Promise<Doctor>;
  getDoctorToken(payload: GetUserTokenPayload): Promise<string>;
}
