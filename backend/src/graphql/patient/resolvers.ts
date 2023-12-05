import { patients } from "@prisma/client";
import _ from "lodash";
import PatientService from "../../services/PatientService";
import PatientsRepository from "../../repository/patients";
import { prisma } from "../../repository/prisma-repo";

const patientRepo = new PatientsRepository(prisma);
const patientService = new PatientService(patientRepo);

const queries = {
  patients: () => {
    return patientService.getAllPatients();
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
