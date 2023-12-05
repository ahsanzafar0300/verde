import { Patient } from "./patient/index.js";
import { Doctor } from "./doctor/index.js";
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
