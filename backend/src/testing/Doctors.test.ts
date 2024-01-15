import DoctorsRepository from "../repository/doctors";
import DoctorService from "../services/DoctorService";
import { doctors } from "@prisma/client";

describe("DoctorService", () => {
  const doctorRepo = new DoctorsRepository();
  const doctorService = new DoctorService(doctorRepo);
  describe("getAllDoctors", () => {
    it("returns all doctors", async () => {
      const result = await doctorService.getAllDoctors();
      expect(result).toBeInstanceOf<doctors[]>;
    });
  });

  describe("findDoctorByEmail", () => {
    it("finds a doctor by email", async () => {
      const result = await doctorService.findDoctorByEmail(
        process.env.DOCTOR_MAIL!
      );
      expect(result).toBeInstanceOf<doctors>;
    });
  });

  describe("get doctor token", () => {
    it("finds a doctor by email", async () => {
      const email = process.env.DOCTOR_MAIL!;
      const password = process.env.DOCTOR_PASSWORD!;
      const result = await doctorService.getDoctorToken({ email, password });
      expect(result).toBeDefined();
    });
  });
});
