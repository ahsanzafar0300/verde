import BaseRepository from "./baseRepository.js";
import { MODELS_NAME, prisma, } from "./prisma-repo.js";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT = process.env.SALT;
class DoctorsRepository extends BaseRepository(MODELS_NAME.DOCTORS) {
    prisma;
    static prisma = prisma;
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    static initializePrisma(prisma) {
        DoctorsRepository.prisma = prisma;
    }
    static findDoctors() {
        return DoctorsRepository.prisma.doctors.findMany({});
    }
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static findDoctorByEmail(email) {
        return DoctorsRepository.prisma.doctors.findFirst({ where: { email } });
    }
    // async findDoctorById(id: number, select: Select) {
    //   return this.prisma.doctors.findUnique({
    //     where: { doctor_id:id },
    //     select,
    //   });
    // }
    async createDoctor(data) {
        const { password, ...other } = data;
        const usersHashPassword = DoctorsRepository.generateHash(SALT, password);
        const userData = { ...other, password: usersHashPassword };
        return this.prisma.doctors.create({
            data: userData,
        });
    }
    static async getDoctorToken(payload) {
        const { email, password } = payload;
        const user = await DoctorsRepository.findDoctorByEmail(email);
        if (!user)
            throw new Error("user not found");
        const usersHashPassword = DoctorsRepository.generateHash(SALT, password);
        if (usersHashPassword !== user.password)
            throw new Error("Incorrect Password");
        // Gen Token
        const token = JWT.sign({ id: user.doctor_id, email: user.email }, JWT_SECRET);
        return token;
    }
    async updateDoctor(id, data) {
        return this.prisma.doctors.update({
            where: { doctor_id: id },
            data,
        });
    }
}
export default DoctorsRepository;
