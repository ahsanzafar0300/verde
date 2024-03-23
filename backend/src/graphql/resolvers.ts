import { Patient } from "./patient";
import { Doctor } from "./doctor";
import { Admin } from "./admin";
import { Hospital } from "./hospital";
import { Specialization } from "./specialization";
import { Payment } from "./payment";
import { Appointment } from "./appointment";
import { DoctorHospital } from "./doctorHospital";
import { DoctorSpecialization } from "./doctorSpecialization";
import { UserOtp } from "./userOtp";

export const resolvers = {
  Query: {
    ...Doctor.resolvers.queries,
    ...Patient.resolvers.queries,
    ...Admin.resolvers.queries,
    ...Hospital.resolvers.queries,
    ...Specialization.resolvers.queries,
    ...Payment.resolvers.queries,
    ...Appointment.resolvers.queries,
    ...DoctorHospital.resolvers.queries,
    ...DoctorSpecialization.resolvers.queries,
    ...UserOtp.resolvers.queries,
  },
  Mutation: {
    ...Doctor.resolvers.mutations,
    ...Patient.resolvers.mutations,
    ...Admin.resolvers.mutations,
    ...Hospital.resolvers.mutations,
    ...Specialization.resolvers.mutations,
    ...Payment.resolvers.mutations,
    ...Appointment.resolvers.mutations,
    ...DoctorHospital.resolvers.mutations,
    ...DoctorSpecialization.resolvers.mutations,
    ...UserOtp.resolvers.mutations,
  },
};
