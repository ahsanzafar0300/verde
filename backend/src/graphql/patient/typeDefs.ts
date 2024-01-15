export const typeDefs = `#graphql
    type Patient {
        id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
        is_verified: Boolean
        verification_code:String
    }
    type PatientReturn{
        token:String
        email:String
    }
    input PatientInput {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        gender: String!
        password: String!
    }
    input PatientInputUpdate {
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
        is_verified: Boolean
        verification_code:String
    }
`;
