import {
  AppointmentsRepositoryInterface,
  CreateAppointment,
} from "../interfaces/AppointmentRepositoryInterface";

class AppointmentsService {
  private appointments: AppointmentsRepositoryInterface;

  constructor(appointments: AppointmentsRepositoryInterface) {
    this.appointments = appointments;
  }

  async getAllAppointments() {
    const appointments = this.appointments.findAppointments();
    return appointments;
  }

  async findAppointmentByPatient(id: number) {
    const appointment = this.appointments.findAppointmentsByPatient(id);
    return appointment;
  }

  async findAppointmentByDoctor(id: number) {
    const appointment = this.appointments.findAppointmentsByDoctor(id);
    return appointment;
  }

  async createAppointment(data: CreateAppointment) {
    try {
      return this.appointments.createAppointment(data);
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw new Error("Failed to create appointment");
    }
  }

  async getPatientAppointments(id: number) {
    const appointments = this.appointments.getPatientAppointments(id);
    return appointments;
  }

  async getDoctorAppointments(id: number) {
    const appointments = this.appointments.getDoctorAppointments(id);
    return appointments;
  }

  async getPaymentAppointment(id: number) {
    const appointments = this.appointments.getPaymentAppointment(id);
    return appointments;
  }
}

export default AppointmentsService;
