export const queries = `#graphql
      doctors:[Doctor],
      findDoctorByEmail(email:String!):Doctor
      getDoctorToken(email: String!, password: String!): String
`;
