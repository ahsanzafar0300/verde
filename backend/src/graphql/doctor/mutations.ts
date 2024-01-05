export const mutations = `#graphql
    createDoctor(data:DoctorInput!):Doctor
    updateDoctor(id:String!,data:DoctorInputUpdate!):Doctor
`;
