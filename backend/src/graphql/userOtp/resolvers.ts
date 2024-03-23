import _ from "lodash";
import UserOtpRepository from "../../repository/userOtp";
import UserOtpService from "../../services/UserOtpService";

const userOtpRepo = new UserOtpRepository();
const userOtpService = new UserOtpService(userOtpRepo);

const queries = {
  verifyUserOtp: (
    _: void,
    { email, role, code }: { email: string; role: string; code: string }
  ) => {
    return userOtpService.verifyUserOtp(email, role, code);
  },
};

const mutations = {
  createUserOtp: async (
    _: void,
    { email, role }: { email: string; role: string },
    context: void
  ) => {
    return userOtpService.createUserOtp(email, role);
  },
};

export const resolvers = { queries, mutations };
