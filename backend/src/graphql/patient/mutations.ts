export const mutations = `#graphql
    createPatient(data:PatientInput!):PatientSignupReturn
    updatePatient(id:String!,data:PatientInputUpdate!):Patient
    updatePatientPassword(id:String!,password:String!):Patient
`;
