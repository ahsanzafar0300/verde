export const typeDefs = `#graphql
type DoctorHospital{
        id:ID
        doctor_id:ID
        hospital_id:ID
    }
    type Hospital{
        id: ID
        name: String
        location: String
        phone_number: String
        doctorHospitals:[DoctorHospital]
    }
    input HospitalInput {
        name: String
        location: String
        phone_number: String
    }
`;
