import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserByEmail, getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn() {
      // console.log("USER: ",user)
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.cust_id && session.user) {
        session.user.cust_id = token.cust_id as string;
      }
      if (token.password && session.user) {
        session.user.password = token.password as string;
      }
      // if (token.firstName && session.user) {
      //   session.user.firstName = token.firstName as string;
      // }


      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      
      if (!existingUser) return token;
      
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.password = existingUser.password
      token.cust_id = existingUser.cust_id

      // if (existingCustomer) {
      //   token.pincode = existingCustomer.pincode;
      //   token.firstName = existingCustomer.f_name;
      //   token.lastName = existingCustomer.l_name;
      //   // Add other customer details as needed
      //   // For example:
      //   // token.state = existingCustomer.state;
      //   // token.bankId = existingCustomer.bank_id;
      //   // token.accountNo = existingCustomer.account_no;
      // }
      
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
