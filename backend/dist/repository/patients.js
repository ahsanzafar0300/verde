import BaseRepository from "./baseRepository.js";
import { MODELS_NAME, prisma, } from "./prisma-repo.js";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT = process.env.SALT;
class PatientsRepository extends BaseRepository(MODELS_NAME.PATIENTS) {
    prisma;
    static prisma = prisma;
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    static initializePrisma(prisma) {
        PatientsRepository.prisma = prisma;
    }
    static async findPatients() {
        return PatientsRepository.prisma.patients.findMany({});
    }
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static findPatientByEmail(email) {
        return PatientsRepository.prisma.patients.findFirst({ where: { email } });
    }
    async createPatient(data) {
        const { password, ...other } = data;
        const usersHashPassword = PatientsRepository.generateHash(SALT, password);
        const userData = { ...other, password: usersHashPassword };
        return this.prisma.patients.create({
            data: userData,
        });
    }
    static async getPatientToken(payload) {
        const { email, password } = payload;
        const user = await PatientsRepository.findPatientByEmail(email);
        if (!user)
            throw new Error("user not found");
        const usersHashPassword = PatientsRepository.generateHash(SALT, password);
        if (usersHashPassword !== user.password)
            throw new Error("Incorrect Password");
        const token = JWT.sign({ id: user.patient_id, email: user.email }, JWT_SECRET);
        return token;
    }
}
export default PatientsRepository;
