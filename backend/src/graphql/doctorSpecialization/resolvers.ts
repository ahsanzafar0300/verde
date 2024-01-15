import { doctorSpecialization } from "@prisma/client";
import _ from "lodash";
import DoctorSpecializationService from "../../services/DoctorSpecializationService";
import DoctorSpecializationRepository from "../../repository/doctorSpecialization";

const doctorSpecializationRepo = new DoctorSpecializationRepository();
const doctorSpecializationService = new DoctorSpecializationService(
  doctorSpecializationRepo
);

const queries = {};

const mutations = {
  createDoctorSpecialization: async (
    _: void,
    { data }: { data: doctorSpecialization },
    context: void
  ) => {
    return doctorSpecializationService.createDoctorSpecialization(data);
  },
};

export const resolvers = { queries, mutations };
