export const queries = `#graphql
      admin:[Admin],
      findAdminByEmail(email:String!):Admin
      getAdminToken(email: String!, password: String!): AdminReturn
      adminForgotPassword(email: String, id: ID): Admin
      verifyAdminCode(code: String, id: ID):Boolean
`;
