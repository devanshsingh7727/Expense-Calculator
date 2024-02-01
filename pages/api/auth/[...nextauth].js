import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
let customData = {};
export const authOptions = {
  secret: process.env.NEXTAUTH_URL,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECERT,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const res = await fetch(
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/socialLoginRegister"
            : "https://expense-calculator-devansh.vercel.app/api/socialLoginRegister",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...user,
              ...account,
            }),
          }
        );

        const data = await res.json();
        console.log("data", data);
        if (res.ok && data.user._id) {
          user._id = data.user._id; // Assuming that data includes a unique _id.
          return true;
        } else {
          return false; // Sign-in failed due to some issue with the API call.
        }
      } catch (error) {
        console.error("SignIn API call error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      console.log(" token, user", token, user);
      // This callback is invoked whenever a JWT is created (during sign in) or updated
      if (user?._id) {
        token._id = user._id; // Persist the _id into the JWT
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session, token", session, token, user);
      session.user._id = token._id; // Use the _id from the JWT token
      return session;
    },
  },
};

export default NextAuth(authOptions);
