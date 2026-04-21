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


export function cleanText(text: string) {
  return text ? parse(text) : "";
}

export function checkLength(n: string, measure: number) {
  return n.length <= measure ? n : `${n.slice(0, measure)}...`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateInput<T extends z.ZodObject<any>>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const parsed = schema.safeParse(data);
  const error = parsed.error?.issues.map((i) => ({
    field: i.path.join("."),
    message: i.message,
  }));
  if (!parsed.success) throw new Error(JSON.stringify(error));

  return parsed.data;
}
