import { doctors } from "@prisma/client";
import DoctorService from "../../services/DoctorService";
import _ from "lodash";
import DoctorsRepository from "../../repository/doctors";
import { prisma } from "../../repository/prisma-repo";

const doctorRepo = new DoctorsRepository(prisma);
const doctorService = new DoctorService(doctorRepo);

const queries = {
  doctors: () => {
    return doctorService.getAllDoctors();
  },
  findDoctorByEmail: (_: void, { email }: { email: string }) => {
    return doctorService.findDoctorByEmail(email);
  },
  getDoctorToken: (_: void, payload: { email: string; password: string }) => {
    return doctorService.getDoctorToken({
      email: payload.email,
      password: payload.password,
    });
  },
};

const mutations = {
  createDoctor: async (_: void, { data }: { data: doctors }, context: void) => {
    return doctorService.createDoctor(data);
  },
};

export const resolvers = { queries, mutations };
