export const NEW_DOCTOR_QUERY = `
mutation($data: DoctorInput!) {
  createDoctor(data: $data) {
    email,
    error
  }
}
`;

export const EXISTING_DOCTOR_QUERY = `
query($email: String!) {
findDoctorByEmail(email: $email) {
  id
}
}
`;

export const DOCTOR_SEND_OTP_QUERY = `
query($email: String) {
doctorOTP(email: $email) {
  code
}
}
`;

export const DOCTOR_VERIFY_OTP_QUERY = `
query ($code: String, $hashCode: String) {
verifyDoctorOTP(code: $code, hashCode: $hashCode)
}
`;
