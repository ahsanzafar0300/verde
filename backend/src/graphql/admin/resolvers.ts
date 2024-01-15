import { admin } from "@prisma/client";
import _ from "lodash";
import AdminRepository from "../../repository/admin";
import AdminService from "../../services/AdminService";

const adminRepo = new AdminRepository();
const adminService = new AdminService(adminRepo);

const queries = {
  admin: () => {
    return adminService.getAllAdmin();
  },
  findAdminByEmail: (_: void, { email }: { email: string }) => {
    return adminService.findAdminByEmail(email);
  },
  getAdminToken: (_: void, payload: { email: string; password: string }) => {
    return adminService.getAdminToken({
      email: payload.email,
      password: payload.password,
    });
  },
  adminForgotPassword: async (
    _: void,
    { email, id }: { email: string; id: string }
  ) => {
    return adminService.adminForgotPassword(email, parseInt(id));
  },
  verifyAdminCode: async (
    _: void,
    { code, id }: { code: string; id: string }
  ) => {
    return adminService.verifyAdminCode(code, parseInt(id));
  },
};

const mutations = {
  createAdmin: async (_: void, { data }: { data: admin }) => {
    return adminService.createAdmin(data);
  },
  updateAdmin: async (_: void, { id, data }: { id: string; data: any }) => {
    return adminService.updateAdmin(parseInt(id), data);
  },
  updateAdminPassword: async (
    _: void,
    { id, password }: { id: string; password: string }
  ) => {
    return adminService.updateAdminPassword(parseInt(id), password);
  },
};

export const resolvers = { queries, mutations };
