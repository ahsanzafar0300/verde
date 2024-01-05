export const typeDefs = `#graphql
    type Payment{
        id: ID
        amount:       Float
        payment_date: String
        is_paid:      Boolean
    }
    input PaymentInput {
        amount:       Float
        payment_date: String
        is_paid:      Boolean
    }
`;
