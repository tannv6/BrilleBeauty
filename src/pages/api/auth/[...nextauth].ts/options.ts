import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
            },
            async authorize(credentials) {
                const user = { id: "42", name: "dat", password: "123456" }
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    }
    ,
    secret: process.env.NEXTAUTH_SECRET,
    
}