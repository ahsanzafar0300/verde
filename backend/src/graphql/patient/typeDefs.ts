export const typeDefs = `#graphql
    type Patient {
        patient_id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
    }
    input PatientInput {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        gender: String!
        password: String!
    }
`;
