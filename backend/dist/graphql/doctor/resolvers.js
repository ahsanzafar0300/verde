import DoctorService from "../../services/DoctorService.js";
const queries = {
    doctors: () => {
        return DoctorService.getAllDoctors();
    },
    findDoctorByEmail: (_, { email }) => {
        return DoctorService.findDoctorByEmail(email);
    },
    getDoctorToken: (_, payload) => {
        return DoctorService.getDoctorToken({
            email: payload.email,
            password: payload.password,
        });
    },
};
const mutations = {
    createDoctor: async (_, { data }, context) => {
        return DoctorService.createDoctor(data);
    },
};
export const resolvers = { queries, mutations };
