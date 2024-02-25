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
  findAppointmentByPatient: (_: void, { id }: { id: string }) => {
    return appointmentService.findAppointmentByPatient(parseInt(id));
  },
  findAppointmentByDoctor: (_: void, { id }: { id: string }) => {
    return appointmentService.findAppointmentByDoctor(parseInt(id));
  },
  getPatientAppointments: (_: void, { id }: { id: string }) => {
    return appointmentService.getPatientAppointments(parseInt(id));
  },
  getDoctorAppointments: (_: void, { id }: { id: string }) => {
    return appointmentService.getDoctorAppointments(parseInt(id));
  },
  getPaymentAppointment: (_: void, { id }: { id: string }) => {
    return appointmentService.getPaymentAppointment(parseInt(id));
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
