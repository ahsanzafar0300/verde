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
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface ReturnUserTokenPayload {
  token: string;
  email: string;
  role: string;
}

export interface AdminRepositoryInterface {
  findAdmin(): Promise<Admin[]>;
  findAdminByEmail(email: string): Promise<Admin | null>;
  createAdmin(data: CreateAdmin): Promise<Admin>;
  getAdminToken(payload: GetUserTokenPayload): Promise<ReturnUserTokenPayload>;
}
