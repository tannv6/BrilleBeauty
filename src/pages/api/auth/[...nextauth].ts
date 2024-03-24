import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        const user = await axios.get(
          "http://localhost:3000/api/customers/login",
          {
            params: {
              UserNameOrEmail: credentials?.username,
              Password: credentials?.password,
            },
          }
        );
        if (user.data) {
          return Promise.resolve({
            id: user.data?.CustomerID,
            name: user.data?.LastName,
          });
        } else {
          return Promise.resolve(null);
        }
      },
      credentials: {},
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }: any) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.id = token.id;
      }

      return session;
    },
  },
});
