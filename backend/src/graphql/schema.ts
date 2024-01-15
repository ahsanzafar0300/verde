import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Admin } from "./admin";
import { Hospital } from "./hospital";
import { Specialization } from "./specialization";
import { Payment } from "./payment";
import { Appointment } from "./appointment";
import { DoctorHospital } from "./doctorHospital";
import { DoctorSpecialization } from "./doctorSpecialization";

export const typeDefs = `#graphql
    ${Doctor.typeDefs}
    ${Patient.typeDefs}
    ${Admin.typeDefs}
    ${Hospital.typeDefs}
    ${Specialization.typeDefs}
    ${Payment.typeDefs}
    ${Appointment.typeDefs}
    ${DoctorHospital.typeDefs}
    ${DoctorSpecialization.typeDefs}
    type Query{
      ${Patient.queries}
      ${Doctor.queries}
      ${Admin.queries}
      ${Hospital.queries}
      ${Specialization.queries}
      ${Payment.queries}
      ${Appointment.queries}
      ${DoctorHospital.queries}
      ${DoctorSpecialization.queries}
    }
    type Mutation{
        ${Patient.mutations}
        ${Doctor.mutations}
        ${Admin.mutations}
        ${Hospital.mutations}
        ${Specialization.mutations}
        ${Payment.mutations}
        ${Appointment.mutations}
        ${DoctorHospital.mutations}
        ${DoctorSpecialization.mutations}
    }
`;
