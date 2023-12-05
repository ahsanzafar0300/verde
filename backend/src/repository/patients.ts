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
  CreatePatient,
  GetUserTokenPayload,
  PatientsRepositoryInterface,
} from "../interfaces/PatientsRepositoryInterface";

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.PATIENTS]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.PATIENTS]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.PATIENTS]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.PATIENTS]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.PATIENTS]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.PATIENTS]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.PATIENTS]["Order"];
// type Delegate = ModelTypes[typeof MODELS_NAME.PATIENTS]["Delegate"];
// type GroupBy = ModelTypes[typeof MODELS_NAME.PATIENTS]["GroupBy"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.PATIENTS>;
type Model = ModelStructure[typeof MODELS_NAME.PATIENTS];
/*  eslint-enable @typescript-eslint/no-unused-vars */

const JWT_SECRET = process.env.JWT_SECRET!;

const SALT = process.env.SALT!;

class PatientsRepository
  extends BaseRepository(MODELS_NAME.PATIENTS)
  implements PatientsRepositoryInterface
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async findPatients() {
    return this.prisma.patients.findMany({});
  }

  private async generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  async findPatientByEmail(email: string) {
    return this.prisma.patients.findFirst({ where: { email } });
  }

  async createPatient(data: CreatePatient) {
    const { password, ...other } = data;
    const usersHashPassword = await this.generateHash(SALT, password);
    const userData = { ...other, password: usersHashPassword };
    return this.prisma.patients.create({
      data: userData,
    });
  }

  async getPatientToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.findPatientByEmail(email);
    if (!user) throw new Error("user not found");

    const usersHashPassword = await this.generateHash(SALT, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    const token = JWT.sign(
      { id: user.patient_id, email: user.email },
      JWT_SECRET
    );
    return token;
  }
}

export default PatientsRepository;
