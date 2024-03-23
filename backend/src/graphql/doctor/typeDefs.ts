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
        verification_code_expiry:Int
        image: String
        city: String                 
        country: String              
        department: String           
        experience: String          
        registration_no: String     
        qualification: String       
        consultation_mode: String   
        consultation_fee_regular: Float    
        consultation_fee_discounted: Float
        booking_lead_time: String   
        payout_method: String        
        payout_method_id: String     
        address: String              
        postal_code: String          
        services: [String]            
        specialization: [String]       
        bibliography: String             
        doctorHospitals:[DoctorHospital]
    }
    type DoctorReturn{
        id:ID
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
        verification_code_expiry:Int
        image: String
        city: String                 
        country: String              
        department: String           
        experience: String          
        registration_no: String     
        qualification: String       
        consultation_mode: String   
        consultation_fee_regular: Float    
        consultation_fee_discounted: Float
        booking_lead_time: String   
        payout_method: String        
        payout_method_id: String     
        address: String              
        postal_code: String          
        services: [String]            
        specialization: [String]       
        bibliography: String
    }
    type DoctorOTP{
        code:String
    }
`;
