import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "773464006916-ungru9s12nsa7cio3ove4f9qrhur379n.apps.googleusercontent.com",
      clientSecret: "1VrX5_wCRraAk-eiYyEeYA6E",
    }),
  ],
};

export default NextAuth(authOptions);
