import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connection from "../../../lib/Connection";
let customData = {};
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "773464006916-ungru9s12nsa7cio3ove4f9qrhur379n.apps.googleusercontent.com",
      clientSecret: "1VrX5_wCRraAk-eiYyEeYA6E",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const res = await fetch(
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/socialLoginRegister"
            : "expense-calculator-devansh.vercel.app/api/socialLoginRegister",
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
