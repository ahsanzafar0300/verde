import { Patient } from "./patient";
import { Doctor } from "./doctor";

export const resolvers = {
  Query: {
    ...Doctor.resolvers.queries,
    ...Patient.resolvers.queries,
  },
  Mutation: {
    ...Doctor.resolvers.mutations,
    ...Patient.resolvers.mutations,
  },
};
