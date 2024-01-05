import { doctors } from "@prisma/client";
import DoctorService from "../../services/DoctorService";
import _ from "lodash";
import DoctorsRepository from "../../repository/doctors";

const doctorRepo = new DoctorsRepository();
const doctorService = new DoctorService(doctorRepo);

const queries = {
  doctors: () => {
    return doctorService.getAllDoctors();
  },
  findDoctorById: (_: void, { id }: { id: string }) => {
    return doctorService.findDoctorById(parseInt(id));
  },
  findDoctorByEmail: (_: void, { email }: { email: string }) => {
    return doctorService.findDoctorByEmail(email);
  },
  findDoctorsByIds: (_: void, { ids }: { ids: number[] }) => {
    return doctorService.findDoctorsByIds(ids);
  },
  getDoctorToken: (_: void, payload: { email: string; password: string }) => {
    return doctorService.getDoctorToken({
      email: payload.email,
      password: payload.password,
    });
  },
  getSpecializationDoctors: (_: void, { id }: { id: number }) => {
    return doctorService.getSpecializationDoctors(id);
  },
  getHospitalDoctors: (_: void, { id }: { id: string }) => {
    return doctorService.getHospitalDoctors(parseInt(id));
  },
};

const mutations = {
  createDoctor: async (_: void, { data }: { data: doctors }, context: void) => {
    return doctorService.createDoctor(data);
  },
  updateDoctor: async (
    _: void,
    { id, data }: { id: string; data: any },
    context: void
  ) => {
    return doctorService.updateDoctor(parseInt(id), data);
  },
};

export const resolvers = { queries, mutations };
