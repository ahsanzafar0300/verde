import { Prisma } from "@prisma/client";

export interface CreateDoctorHospital {
  doctor_id: number;
  hospital_id: number;
}

export interface RemoveDoctorHospital {
  doctor_id: number;
  hospital_id: number;
}

export interface DoctorHospital {
  id: number;
  doctor_id: number;
  hospital_id: number;
}

export interface DoctorHospitalRepositoryInterface {
  createDoctorHospital(data: CreateDoctorHospital): Promise<DoctorHospital>;
  removeDoctorHospital(
    data: RemoveDoctorHospital
  ): Promise<Prisma.BatchPayload>;
}
