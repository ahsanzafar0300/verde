export const typeDefs = `#graphql
    type UserOtp{
        id: ID
        email: String
        role: String
        otp:String
        otp_expiry:Int
    }
`;
