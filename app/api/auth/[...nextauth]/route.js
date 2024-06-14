import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import User from "@models/User";
import connectDB from "@utils/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await connectDB();
        let user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          user = { firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, role: user.role, registrationDate: user.registrationDate, lastLogin: user.lastLogin }
          return user;
        }
        return null;
      },
      pages: {
        signIn: "/login",
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user
      }

      return session;
    }
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }