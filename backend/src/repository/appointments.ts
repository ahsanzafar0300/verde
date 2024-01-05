import { prisma } from "..";
import {
  AppointmentsRepositoryInterface,
  CreateAppointment,
} from "../interfaces/AppointmentRepositoryInterface";

class AppointmentsRepository implements AppointmentsRepositoryInterface {
  async findAppointments() {
    const appointments = prisma.appointments.findMany();
    return appointments;
  }

  async findAppointmentsByPatient(id: number) {
    return prisma.appointments.findMany({ where: { patient_id: id } });
  }

  async findAppointmentsByDoctor(id: number) {
    return prisma.appointments.findMany({ where: { doctor_id: id } });
  }

  async createAppointment(appointmentData: CreateAppointment) {
    return prisma.appointments.create({
      data: appointmentData,
    });
  }

  async getPatientAppointments(id: number) {
    const appointments = prisma.appointments.findMany({
      where: { patient_id: id },
    });
    return appointments;
  }

  async getDoctorAppointments(id: number) {
    const appointments = prisma.appointments.findMany({
      where: { doctor_id: id },
    });
    return appointments;
  }

  async getPaymentAppointment(id: number) {
    const appointments = prisma.appointments.findFirst({
      where: { payment_id: id },
    });
    return appointments;
  }
}

export default AppointmentsRepository;
