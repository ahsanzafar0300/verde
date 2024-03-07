export const NEW_PATIENT_QUERY = `
mutation($data: PatientInput!) {
  createPatient(data: $data) {
    email,
    error
  }
}
`;

export const EXISTING_PATIENT_QUERY = `
query($email: String!) {
findPatientByEmail(email: $email) {
  id
}
}
`;

export const PATIENT_SEND_OTP_QUERY = `
query($email: String) {
patientOTP(email: $email) {
  code
}
}
`;

export const PATIENT_VERIFY_OTP_QUERY = `
query ($code: String, $hashCode: String) {
verifyPatientOTP(code: $code, hashCode: $hashCode)
}
`;
