export const typeDefs = `#graphql

    type DoctorHospital{
        id:ID
        doctor_id:ID
        hospital_id:ID
    }
    type Doctor{
        id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
        is_verified: Boolean
        verification_code: String
        doctorHospitals:[DoctorHospital]
    }
    type DoctorReturn{
        token:String
        email:String
        error:String
    }
    input DoctorInput {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        gender: String!
        password: String!
    }
    input DoctorInputUpdate {
        first_name: String
        last_name: String
        email: String
        phone_number: String
        gender: String
        password: String
        is_verified: Boolean
        verification_code:String
    }
    type DoctorOTP{
        code:String
    }
`;
