export const queries = `#graphql
      patients:[Patient],
      findPatientByEmail(email:String!):Patient
      getPatientToken(email: String!, password: String!): String
`;
