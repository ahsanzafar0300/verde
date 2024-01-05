import { patients } from "@prisma/client";
import _ from "lodash";
import PatientService from "../../services/PatientService";
import PatientsRepository from "../../repository/patients";

const patientRepo = new PatientsRepository();
const patientService = new PatientService(patientRepo);

const queries = {
  patients: () => {
    return patientService.getAllPatients();
  },
  findPatientById: async (_: void, { id }: { id: string }) => {
    return patientService.findPatientById(parseInt(id));
  },
  findPatientByEmail: async (_: void, { email }: { email: string }) => {
    return patientService.findPatientByEmail(email);
  },
  getPatientToken: async (
    _: void,
    payload: { email: string; password: string }
  ) => {
    return patientService.getPatientToken({
      email: payload.email,
      password: payload.password,
    });
  },
};

const mutations = {
  createPatient: async (_: void, { data }: { data: patients }) => {
    return patientService.createPatient(data);
  },
};

export const resolvers = { queries, mutations };
