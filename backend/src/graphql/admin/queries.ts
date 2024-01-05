export const queries = `#graphql
      admin:[Admin],
      findAdminByEmail(email:String!):Admin
      getAdminToken(email: String!, password: String!): AdminReturn
`;
