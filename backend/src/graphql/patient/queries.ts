export const queries = `#graphql
      patients:[Patient],
      findPatientByEmail(email:String!):Patient
      findPatientById(id:String!):Patient
      getPatientToken(email: String!, password: String!): PatientReturn
      patientForgotPassword(email: String, id: ID): Patient
      verifyPatientCode(code: String, id: ID):Boolean
`;
