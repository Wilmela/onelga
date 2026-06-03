"use server";

import { handleErrors } from "@/lib/utils";

export async function createComment() {

  try {
  } catch (error) {
    return {
      error: handleErrors(error),
    };
  }
}
