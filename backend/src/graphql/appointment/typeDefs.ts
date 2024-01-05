export const typeDefs = `#graphql
    type Appointment{
        id: ID
        appointment_date: String
        appointment_type: String
        appointment_time : String
        patient_id: ID
        doctor_id:    ID 
        payment_id:ID
    }
    input AppointmentInput {
        appointment_date: String
        appointment_type: String
        appointment_time : String
        patient_id: ID
        doctor_id:    ID 
        payment_id:ID
    }
`;
