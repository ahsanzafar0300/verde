import PatientService from "../../services/PatientService.js";
const queries = {
    patients: () => {
        return PatientService.getAllPatients();
    },
    findPatientByEmail: async (_, { email }) => {
        return PatientService.findPatientByEmail(email);
    },
    getPatientToken: async (_, payload) => {
        return PatientService.getPatientToken({
            email: payload.email,
            password: payload.password,
        });
    },
};
const mutations = {
    createPatient: async (_, { data }) => {
        return PatientService.createPatient(data);
    },
};
export const resolvers = { queries, mutations };
