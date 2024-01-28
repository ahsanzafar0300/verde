export const mutations = `#graphql
    createDoctor(data:DoctorInput!):DoctorReturn
    updateDoctor(id:String!,data:DoctorInputUpdate!):Doctor
    updateDoctorPassword(id:String!,password:String!):Doctor
`;
