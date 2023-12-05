import { Doctor } from "./doctor";
import { Patient } from "./patient";

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
