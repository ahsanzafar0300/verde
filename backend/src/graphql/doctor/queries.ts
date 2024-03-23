export const queries = `#graphql
      doctors:[Doctor],
      findDoctorByEmail(email:String!):Doctor
      findDoctorById(id:String!):Doctor
      findDoctorsByIds(ids:[Int]!):[Doctor]
      getDoctorToken(email: String!, password: String!):DoctorReturn
      getSpecializationDoctors(id:Int!):[Doctor]
      getHospitalDoctors(id:String!):[Doctor]
      doctorForgotPassword(email: String, id: ID): Doctor
      verifyDoctorCode(code: String, id: ID):Boolean
`;
