export const typeDefs = `#graphql
    type Specialization{
        id: ID
        title: String
        description: String
    }
    input SpecializationInput {
        title: String!
        description: String!
    }
`;
