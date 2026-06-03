
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL: process.env.BETTER_AUTH_URL as string,
});

export const { signIn, signUp, useSession } = createAuthClient();
