export const ACCESS_TOKEN = "access_token";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNIN: "/signin",
  DOCUMENTS: "/documents",
  DOCUMENTS_ADD: "/documents/add",
} as const;

export function noop() {}

export async function sleep(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
}
