export interface CreateAdmin {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  verification_code?: string;
  verification_code_expiry?: number;
}

export interface UpdateAdmin {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  verification_code?: string;
  verification_code_expiry?: number;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface ReturnUserTokenPayload {
  id: number;
  token: string;
  email: string;
  role: string;
}

export interface ReturnError {
  error: string;
}
export interface AdminRepositoryInterface {
  findAdmin(): Promise<Admin[]>;
  findAdminByEmail(email: string): Promise<Admin | null>;
  createAdmin(data: CreateAdmin): Promise<Admin>;
  getAdminToken(
    payload: GetUserTokenPayload
  ): Promise<ReturnUserTokenPayload | ReturnError>;
  updateAdmin(id: number, data: UpdateAdmin): Promise<Admin>;
  updateAdminPassword(id: number, password: string): Promise<Admin>;
  adminForgotPassword(email: string, id: number): Promise<Admin | null>;
  verifyAdminCode(code: string, id: number): Promise<Boolean>;
}
