import { prisma } from "..";
import {
  CreatePayment,
  Payment,
  PaymentsRepositoryInterface,
} from "../interfaces/PaymentsRepositoryInterface";

class PaymentsRepository implements PaymentsRepositoryInterface {
  async findPayments() {
    const payments = prisma.payments.findMany();
    return payments;
  }

  async findPaymentById(id: number) {
    return prisma.payments.findUnique({ where: { id } });
  }

  async createPayment(paymentData: CreatePayment) {
    return prisma.payments.create({
      data: paymentData,
    });
  }
}

export default PaymentsRepository;
