import PatientsRepository from "../repository/patients.js";
import { prisma } from "../repository/prisma-repo.js";
class PatientService {
    patients;
    constructor(patients) {
        this.patients = patients;
    }
    static async getAllPatients() {
        return PatientsRepository.findPatients();
    }
    static async findPatientByEmail(email) {
        const patient = await PatientsRepository.findPatientByEmail(email);
        return patient;
    }
    static async getPatientToken(payload) {
        const token = await PatientsRepository.getPatientToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }
    static async createPatient(data) {
        try {
            const newPatientObj = new PatientsRepository(prisma);
            const newPatient = await newPatientObj.createPatient(data);
            return newPatient;
        }
        catch (error) {
            console.error("Error creating patient:", error);
            throw new Error("Failed to create patient");
        }
    }
}
export default PatientService;
