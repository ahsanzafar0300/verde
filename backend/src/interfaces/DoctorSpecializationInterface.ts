export interface CreateDoctorSpecialization {
  doctor_id: number;
  specialization_id: number;
}

export interface DoctorSpecialization {
  id: number;
  doctor_id: number;
  specialization_id: number;
}

export interface DoctorSpecializationRepositoryInterface {
  createDoctorSpecialization(
    data: CreateDoctorSpecialization
  ): Promise<DoctorSpecialization>;
}
