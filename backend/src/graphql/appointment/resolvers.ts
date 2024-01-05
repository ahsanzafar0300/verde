import { appointments } from "@prisma/client";
import _ from "lodash";
import AppointmentsRepository from "../../repository/appointments";
import AppointmentsService from "../../services/AppointmentService";

const appointmentRepo = new AppointmentsRepository();
const appointmentService = new AppointmentsService(appointmentRepo);

const queries = {
  appointments: () => {
    return appointmentService.getAllAppointments();
  },
  findAppointmentByPatient: (_: void, { id }: { id: number }) => {
    return appointmentService.findAppointmentByPatient(id);
  },
  findAppointmentByDoctor: (_: void, { id }: { id: number }) => {
    return appointmentService.findAppointmentByDoctor(id);
  },
  getPatientAppointments: (_: void, { id }: { id: number }) => {
    return appointmentService.getPatientAppointments(id);
  },
  getDoctorAppointments: (_: void, { id }: { id: number }) => {
    return appointmentService.getDoctorAppointments(id);
  },
  getPaymentAppointment: (_: void, { id }: { id: number }) => {
    return appointmentService.getPaymentAppointment(id);
  },
};

const mutations = {
  createAppointment: async (
    _: void,
    { data }: { data: appointments },
    context: void
  ) => {
    return appointmentService.createAppointment(data);
  },
};

export const resolvers = { queries, mutations };
