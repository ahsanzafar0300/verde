import DoctorsRepository from "../repository/doctors.js";
import { prisma } from "../repository/prisma-repo.js";
class DoctorService {
    doctors;
    constructor(doctors) {
        this.doctors = doctors;
    }
    static async getAllDoctors() {
        return DoctorsRepository.findDoctors();
    }
    static async findDoctorByEmail(email) {
        const doctor = await DoctorsRepository.findDoctorByEmail(email);
        return doctor;
    }
    static async getDoctorToken(payload) {
        const token = await DoctorsRepository.getDoctorToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }
    static async createDoctor(data) {
        try {
            const newDoctorObj = new DoctorsRepository(prisma);
            const newDoctor = await newDoctorObj.createDoctor(data);
            return newDoctor;
        }
        catch (error) {
            console.error("Error creating doctor:", error);
            throw new Error("Failed to create doctor");
        }
    }
}
export default DoctorService;
