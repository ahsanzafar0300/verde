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
    const appointments = await this.appointments.findAppointments();
    return appointments;
  }

  async findAppointmentByPatient(id: number) {
    const appointment = await this.appointments.findAppointmentsByPatient(id);
    return appointment;
  }

  async findAppointmentByDoctor(id: number) {
    const appointment = await this.appointments.findAppointmentsByDoctor(id);
    return appointment;
  }

  async createAppointment(data: CreateAppointment) {
    const appointment = await this.appointments.createAppointment(data);
    return appointment;
  }

  async getPatientAppointments(id: number) {
    const appointments = await this.appointments.getPatientAppointments(id);
    return appointments;
  }

  async getDoctorAppointments(id: number) {
    const appointments = await this.appointments.getDoctorAppointments(id);
    return appointments;
  }

  async getPaymentAppointment(id: number) {
    const appointments = await this.appointments.getPaymentAppointment(id);
    return appointments;
  }
}

export default AppointmentsService;
