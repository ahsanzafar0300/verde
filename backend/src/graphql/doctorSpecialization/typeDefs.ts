export const typeDefs = `#graphql
    type DoctorSpecialization{
        id: ID
        doctor_id: ID
        specialization_id: ID
    }
    input DoctorSpecializationInput {
        doctor_id: ID
        specialization_id: ID
    }
`;
