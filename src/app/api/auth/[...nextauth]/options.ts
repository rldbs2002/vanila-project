import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import Users from "@/models/Users";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { Session } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.sub.toString(),
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        await connect();

        try {
          const user = await Users.findOne({ email: credentials?.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password ?? "", // Provide a default value (empty string)
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not Found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 세션의 최대 유지 기간 (1일)
  },

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
