import axios from "axios";
import { compareSync } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: any = {
  pages: {
    signIn: "/member/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        const user = await axios.get(
          `http://localhost:3000/api/${
            credentials?.mode == "admin" ? "admin" : "customers"
          }/login`,
          {
            params: {
              UserNameOrEmail: credentials?.username,
            },
          }
        );
        const isRightPass = compareSync(
          credentials?.password || "",
          credentials?.mode == "admin"
            ? user?.data?.AdminPW
            : user?.data?.Password
        );
        if (isRightPass) {
          return Promise.resolve({
            id:
              credentials?.mode == "admin"
                ? user.data?.AdminID
                : user.data?.CustomerID,
            name:
              credentials?.mode == "admin"
                ? user.data?.full_name
                : user.data?.LastName,
          });
        } else {
          return Promise.resolve(null);
        }
      },
      credentials: {},
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
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
};
export default NextAuth(authOptions);
