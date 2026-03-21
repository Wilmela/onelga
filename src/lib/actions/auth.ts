"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { handleErrors } from "../utils";
import { signInFormSchemaType, signUpFormSchemaType } from "../validations";

export async function signUp(data: signUpFormSchemaType) {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      },
      asResponse: true,
    });

    if (res.ok) {
      console.log(res);
    }
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function signIn(data: signInFormSchemaType) {
  try {
    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      asResponse: true,
    });

    if (!res.ok) {
      console.log(res);
    }
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}

export async function signOut() {

  console.log("calling");
  
  try {
    const res = await auth.api.signOut();

    console.log("res:", res);

    if (res.success) {
      console.log("signed out successfully");
    }
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
export async function getCurrentSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session !== null) {
      return session;
    }
  } catch (error) {
    console.log(error);
  }
}
