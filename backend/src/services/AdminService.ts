import {
  AdminRepositoryInterface,
  CreateAdmin,
  GetUserTokenPayload,
  UpdateAdmin,
} from "../interfaces/AdminRepositoryInterface";

class AdminService {
  private admin: AdminRepositoryInterface;

  constructor(admin: AdminRepositoryInterface) {
    this.admin = admin;
  }

  async getAllAdmin() {
    const admins = await this.admin.findAdmin();
    return admins;
  }

  async findAdminByEmail(email: string) {
    const admin = await this.admin.findAdminByEmail(email);
    return admin;
  }

  async getAdminToken(payload: GetUserTokenPayload) {
    const token = await this.admin.getAdminToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  }

  async createAdmin(data: CreateAdmin) {
    const admin = await this.admin.createAdmin(data);
    return admin;
  }

  async updateAdmin(id: number, data: UpdateAdmin) {
    const updatedAdmin = await this.admin.updateAdmin(id, data);
    return updatedAdmin;
  }

  async updateAdminPassword(id: number, password: string) {
    const admin = await this.admin.updateAdminPassword(id, password);
    return admin;
  }

  async adminForgotPassword(email: string, id: number) {
    const admin = await this.admin.adminForgotPassword(email, id);
    return admin;
  }

  async verifyAdminCode(code: string, id: number) {
    const verificationCode = await this.admin.verifyAdminCode(code, id);
    return verificationCode;
  }
}

export default AdminService;
