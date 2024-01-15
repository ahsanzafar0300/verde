import { doctorHospitals } from "@prisma/client";
import _ from "lodash";
import DoctorHospitalService from "../../services/DoctorHospitalService";
import DoctorHospitalRepository from "../../repository/doctorHospital";

const doctorHospitalRepo = new DoctorHospitalRepository();
const doctorHospitalService = new DoctorHospitalService(doctorHospitalRepo);

const queries = {};

const mutations = {
  createDoctorHospital: async (
    _: void,
    { data }: { data: doctorHospitals },
    context: void
  ) => {
    return doctorHospitalService.createDoctorHospital(data);
  },

  removeDoctorHospital: async (
    _: void,
    { data }: { data: doctorHospitals },
    context: void
  ) => {
    return doctorHospitalService.removeDoctorHospital(data);
  },
};

export const resolvers = { queries, mutations };
