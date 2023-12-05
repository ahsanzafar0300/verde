export const typeDefs = `#graphql
    type Doctor{
        doctor_id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
    }
    input DoctorInput {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        gender: String!
        password: String!
    }
`;
