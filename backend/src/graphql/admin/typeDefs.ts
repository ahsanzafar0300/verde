export const typeDefs = `#graphql
    type Admin{
        id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        password: String
        verification_code:String
    }
    type AdminReturn{
        token:String
        email:String
        error:String
    }
    input AdminInput {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        password: String!
    }
    input AdminInputUpdate {
        first_name: String
        last_name: String
        email: String
        phone_number: String
        password: String
        verification_code:String
    }
`;
