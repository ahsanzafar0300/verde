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
        verification_code_expiry:Int
        insurance_id:String,
        age:Int,
        weight:Int,
        blood_group:String,
        other_history:String
    }
    type PatientReturn{
        id:ID
        token:String
        email:String
        error:String
    }
    type PatientSignupReturn{
        email:String
        error:String
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
        verification_code_expiry:Int
        insurance_id:String,
        age:Int,
        weight:Int,
        blood_group:String,
        other_history:String
    }
    type PatientOTP{
        code:String
    }
`;
