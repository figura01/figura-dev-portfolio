import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (
    error.name === "ZodError" &&
    error.errors &&
    error.errors !== "undefinded" &&
    error.errors !== null
  ) {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors)
      .map((field) => error.errors[field].message)
      .join(". ");

    return fieldErrors;
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
// Shorten Uuid
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Con vert prisma object to regular object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
