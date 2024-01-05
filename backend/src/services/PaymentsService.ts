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
    const payments = this.payments.findPayments();
    return payments;
  }

  async findPaymentById(id: number) {
    const payment = this.payments.findPaymentById(id);
    return payment;
  }

  async createPayment(data: CreatePayment) {
    try {
      return this.payments.createPayment(data);
    } catch (error) {
      console.error("Error creating payment:", error);
      throw new Error("Failed to create payment");
    }
  }
}

export default PaymentsService;
