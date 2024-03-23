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
  doctorForgotPassword: async (
    _: void,
    { email, id }: { email: string; id: string }
  ) => {
    return doctorService.doctorForgotPassword(email, parseInt(id));
  },
  verifyDoctorCode: async (
    _: void,
    { code, id }: { code: string; id: string }
  ) => {
    return doctorService.verifyDoctorCode(code, parseInt(id));
  },
};

const mutations = {
  createDoctor: async (_: void, { data }: { data: doctors }) => {
    return doctorService.createDoctor(data);
  },
  updateDoctor: async (_: void, { id, data }: { id: string; data: any }) => {
    return doctorService.updateDoctor(parseInt(id), data);
  },
  updateDoctorPassword: async (
    _: void,
    { id, password }: { id: string; password: string }
  ) => {
    return doctorService.updateDoctorPassword(parseInt(id), password);
  },
};

export const resolvers = { queries, mutations };
