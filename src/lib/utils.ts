import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import parse from "html-react-parser";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lc(n: string) {
  return n.toLowerCase();
}

export function handleErrors(error: unknown) {
  let message;

  if (typeof error === "string") {
    message = error;
  } else if (
    error !== null &&
    typeof error === "object" &&
    "message" in error
  ) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error instanceof ZodError) {
    message = error.message;
  } else {
    message = "An error occurred!";
  }

  return message;
}

// CONST
export const positions = {
  councilor: "councilor",
  chairman: "chairman",
} as const;
export const USER_ROLE = {
  commander: "admin",
  writer: "creator",
  commoner: "user",
} as const;

export function cleanText(text: string) {
  return text ? parse(text) : "";
}

export function checkLength(n: string, measure: number) {
  return n.length < measure ? n : `${n.slice(0, measure)}...`;
}

export function validateInput(
  schema: z.ZodObject,
  data: z.infer<typeof z.ZodObject>,
) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) throw new Error(parsed.error.message);

  return parsed.data;
}
