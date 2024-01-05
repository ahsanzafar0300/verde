export interface CreatePayment {
  amount: number;
  payment_date: Date;
  is_paid: boolean;
}

export interface Payment {
  id: number;
  amount: number;
  payment_date: Date;
  is_paid: boolean;
}

export interface PaymentsRepositoryInterface {
  findPayments(): Promise<Payment[]>;
  findPaymentById(id: number): Promise<Payment | null>;
  createPayment(data: CreatePayment): Promise<Payment>;
}
