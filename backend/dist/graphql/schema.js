import { Doctor } from "./doctor/index.js";
import { Patient } from "./patient/index.js";
export const typeDefs = `#graphql
    ${Doctor.typeDefs}
    ${Patient.typeDefs}
    type Query{
      ${Patient.queries}
      ${Doctor.queries}
    }
    type Mutation{
        ${Patient.mutations}
        ${Doctor.mutations}
    }
`;
