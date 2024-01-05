export const queries = `#graphql
      appointments:[Appointment],
      findAppointmentByPatient(id:ID!):Appointment
      findAppointmentByDoctor(id:ID!):Appointment
      getPatientAppointments(id:ID!):[Appointment]
      getDoctorAppointments(id:ID!):[Appointment]
      getPaymentAppointment(id:ID!):Appointment
`;
