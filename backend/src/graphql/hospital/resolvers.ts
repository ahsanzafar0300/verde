import { hospitals } from "@prisma/client";
import _ from "lodash";
import HospitalsRepository from "../../repository/hospitals";
import HospitalService from "../../services/HospitalService";

const hospitalRepo = new HospitalsRepository();
const hospitalService = new HospitalService(hospitalRepo);

const queries = {
  hospitals: () => {
    return hospitalService.getAllHospitals();
  },
  findHospitalById: (_: void, { id }: { id: string }) => {
    return hospitalService.getSingleHospital(parseInt(id));
  },
  getDoctorHospitals: (_: void, { id }: { id: string }) => {
    return hospitalService.getDoctorHospitals(parseInt(id));
  },
};

const mutations = {
  createHospital: async (
    _: void,
    { data }: { data: hospitals },
    context: void
  ) => {
    return hospitalService.createHospital(data);
  },
};

export const resolvers = { queries, mutations };
