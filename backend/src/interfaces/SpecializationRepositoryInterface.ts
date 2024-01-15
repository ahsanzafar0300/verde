export interface CreateSpecialization {
  title: string;
  description: string;
}

export interface Specialization {
  id: number;
  title: string;
  description: string;
}

export interface SpecializationRepositoryInterface {
  findSpecializations(): Promise<Specialization[]>;
  findSpecializationById(id: number): Promise<Specialization | null>;
  createSpecialization(data: CreateSpecialization): Promise<Specialization>;
  getDoctorSpecializations(id: number): Promise<Specialization[]>;
}
