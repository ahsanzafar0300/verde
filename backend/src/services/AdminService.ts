import {
  AdminRepositoryInterface,
  CreateAdmin,
  GetUserTokenPayload,
} from "../interfaces/AdminRepositoryInterface";

class AdminService {
  private admin: AdminRepositoryInterface;

  constructor(admin: AdminRepositoryInterface) {
    this.admin = admin;
  }

  async getAllAdmin() {
    const doctors = this.admin.findAdmin();
    return doctors;
  }

  async findAdminByEmail(email: string) {
    const doctor = await this.admin.findAdminByEmail(email);
    return doctor;
  }

  async getAdminToken(payload: GetUserTokenPayload) {
    const token = await this.admin.getAdminToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  }

  async createAdmin(data: CreateAdmin) {
    try {
      return this.admin.createAdmin(data);
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw new Error("Failed to create doctor");
    }
  }
}

export default AdminService;
