export interface CreateHospital {
  name: string;
  location: string;
  phone_number: string;
}

export interface Hospital {
  id: number;
  name: string;
  location: string;
  phone_number: string;
}

export interface HospitalRepositoryInterface {
  findHospitals(): Promise<Hospital[]>;
  findSingleHospital(id: number): Promise<Hospital | null>;
  createHospital(data: CreateHospital): Promise<Hospital>;
  getDoctorHospitals(id: number): Promise<Hospital[]>;
}
