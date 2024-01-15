export const queries = `#graphql
      specializations:[Specialization],
      findSpecializationById(id:ID!):Specialization
      getDoctorSpecializations(id:ID!):[Specialization]
`;
