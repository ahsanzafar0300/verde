export const mutations = `#graphql
    createPatient(data:PatientInput!):Patient
    updatePatient(id:String!,data:PatientInputUpdate!):Patient
    updatePatientPassword(id:String!,password:String!):Patient
`;
