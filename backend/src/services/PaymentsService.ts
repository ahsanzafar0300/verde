import {
  CreatePayment,
  PaymentsRepositoryInterface,
} from "../interfaces/PaymentsRepositoryInterface";

class PaymentsService {
  private payments: PaymentsRepositoryInterface;

  constructor(payments: PaymentsRepositoryInterface) {
    this.payments = payments;
  }

  async getAllPayments() {
    const payments = await this.payments.findPayments();
    return payments;
  }

  async findPaymentById(id: number) {
    const payment = await this.payments.findPaymentById(id);
    return payment;
  }

  async createPayment(data: CreatePayment) {
    const payment = await this.payments.createPayment(data);
    return payment;
  }
}

export default PaymentsService;
