export const mutations = `#graphql
    createAdmin(data:AdminInput!):Admin
    updateAdmin(id:String!,data:AdminInputUpdate!):Admin
    updateAdminPassword(id:String!,password:String!):Admin
`;
