import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "placeholder-client-secret"
    })
  ]
};
