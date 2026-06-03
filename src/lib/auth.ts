import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { clientPromise } from "./mongo";
import { siteConfig } from "@/site-config";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise),

  baseURL: siteConfig.baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://onelga.rv.gov",
    "https://www.onelga.rv.gov",
  ],

  user: {
    deleteUser: {
      enabled: true,
    },

    changeEmail: { enabled: true },

    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      },
      username: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  plugins: [nextCookies()],
});
