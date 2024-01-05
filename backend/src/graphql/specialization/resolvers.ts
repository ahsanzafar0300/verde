import { specialization } from "@prisma/client";
import _ from "lodash";
import SpecializationRepository from "../../repository/specialization";
import SpecializationService from "../../services/SpecializationService";

const specializationRepo = new SpecializationRepository();
const specializationService = new SpecializationService(specializationRepo);

const queries = {
  specializations: () => {
    return specializationService.getAllSpecializations();
  },
  findSpecializationById: (_: void, { id }: { id: number }) => {
    return specializationService.findSpecializationById(id);
  },
  getDoctorSpecializations: (_: void, { id }: { id: string }) => {
    return specializationService.getDoctorSpecializations(parseInt(id));
  },
};

const mutations = {
  createSpecialization: async (
    _: void,
    { data }: { data: specialization },
    context: void
  ) => {
    return specializationService.createSpecialization(data);
  },
};

export const resolvers = { queries, mutations };
