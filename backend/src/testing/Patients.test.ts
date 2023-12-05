import PatientsRepository from "../repository/patients";
import { prisma } from "../repository/prisma-repo";
import PatientService from "../services/PatientService";
import { patients } from "@prisma/client";

const patientRepo = new PatientsRepository(prisma);
const patientService = new PatientService(patientRepo);

describe("PatientService", () => {
  describe("getAllPatients", () => {
    it("returns all patients", async () => {
      const result = await patientService.getAllPatients();
      expect(result).toBeInstanceOf<patients[]>;
    });
  });

  describe("findPatientByEmail", () => {
    it("finds a patient by email", async () => {
      const result = await patientService.findPatientByEmail(
        process.env.PATIENT_MAIL!
      );
      expect(result).toBeInstanceOf<patients>;
    });
  });

  describe("get patient token", () => {
    it("finds a patient by email", async () => {
      const email = process.env.PATIENT_MAIL!;
      const password = process.env.PATIENT_PASSWORD!;
      const result = await patientService.getPatientToken({ email, password });
      expect(result).toBeDefined();
    });
  });
});
