export const queries = `#graphql
      hospitals:[Hospital],
      findHospitalById(id:String!):Hospital
      getDoctorHospitals(id:String!):[Hospital]
`;
