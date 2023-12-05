import _ from "lodash";
import BaseRepository from "./baseRepository";
import {
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
} from "./prisma-repo";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";
import {
  CreateDoctor,
  DoctorsRepositoryInterface,
  GetUserTokenPayload,
} from "../interfaces/DoctorsRepositoryInterface";

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.DOCTORS]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.DOCTORS]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.DOCTORS]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.DOCTORS]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.DOCTORS]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.DOCTORS]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.DOCTORS]["Order"];
// type Delegate = ModelTypes[typeof MODELS_NAME.DOCTORS]["Delegate"];
// type GroupBy = ModelTypes[typeof MODELS_NAME.DOCTORS]["GroupBy"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.DOCTORS>;
type Model = ModelStructure[typeof MODELS_NAME.DOCTORS];
/*  eslint-enable @typescript-eslint/no-unused-vars */

const JWT_SECRET = process.env.JWT_SECRET!;

const SALT = process.env.SALT!;

class DoctorsRepository
  extends BaseRepository(MODELS_NAME.DOCTORS)
  implements DoctorsRepositoryInterface
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async findDoctors() {
    return this.prisma.doctors.findMany({});
  }

  private async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  async findDoctorByEmail(email: string) {
    return this.prisma.doctors.findFirst({ where: { email } });
  }

  async createDoctor(data: CreateDoctor) {
    const { password, ...other } = data;
    const usersHashPassword = await this.generateHash(SALT, password);
    const userData = { ...other, password: usersHashPassword };
    return this.prisma.doctors.create({
      data: userData,
    });
  }

  async getDoctorToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findDoctorByEmail(email);
    if (!user) throw new Error("user not found");

    const usersHashPassword = await this.generateHash(SALT, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = JWT.sign(
      { id: user.doctor_id, email: user.email },
      JWT_SECRET
    );
    return token;
  }
}

export default DoctorsRepository;
