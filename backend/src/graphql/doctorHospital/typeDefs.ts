export const typeDefs = `#graphql
    type DoctorHospital{
        id: ID
        doctor_id: ID
        hospital_id: ID
    }
    input DoctorHospitalInput {
        doctor_id: Int
        hospital_id: Int
    }
`;
