export interface CreateAppointment {
  appointment_date: Date;
  appointment_type: string;
  appointment_time: Date;
  patient_id: number;
  doctor_id: number;
  payment_id: number;
}

export interface Appointment {
  id: number;
  appointment_date: Date;
  appointment_type: string;
  appointment_time: Date;
  patient_id: number;
  doctor_id: number;
  payment_id: number;
}

export interface AppointmentsRepositoryInterface {
  findAppointments(): Promise<Appointment[]>;
  findAppointmentsByPatient(id: number): Promise<Appointment[] | null>;
  findAppointmentsByDoctor(id: number): Promise<Appointment[] | null>;
  createAppointment(data: CreateAppointment): Promise<CreateAppointment>;
  getPatientAppointments(id: number): Promise<Appointment[]>;
  getDoctorAppointments(id: number): Promise<Appointment[]>;
  getPaymentAppointment(id: number): Promise<Appointment | null>;
}
