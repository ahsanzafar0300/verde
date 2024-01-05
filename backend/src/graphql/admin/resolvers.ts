import { admin } from "@prisma/client";
import _ from "lodash";
import AdminRepository from "../../repository/admin";
import AdminService from "../../services/AdminService";
// import { prisma } from "../../";

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
};

const mutations = {
  createAdmin: async (_: void, { data }: { data: admin }, context: void) => {
    return adminService.createAdmin(data);
  },
};

export const resolvers = { queries, mutations };
