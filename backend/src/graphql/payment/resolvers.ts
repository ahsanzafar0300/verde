import { payments } from "@prisma/client";
import _ from "lodash";
import PaymentsService from "../../services/PaymentsService";
import PaymentsRepository from "../../repository/payments";

const paymentRepo = new PaymentsRepository();
const paymentService = new PaymentsService(paymentRepo);

const queries = {
  payments: () => {
    return paymentService.getAllPayments();
  },
  findPaymentById: (_: void, { id }: { id: number }) => {
    return paymentService.findPaymentById(id);
  },
};

const mutations = {
  createPayment: async (
    _: void,
    { data }: { data: payments },
    context: void
  ) => {
    return paymentService.createPayment(data);
  },
};

export const resolvers = { queries, mutations };
