import path from "path";

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

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
];

export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".pdf":
      return "application/pdf";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case ".txt":
      return "text/plain";
    default:
      return "application/octet-stream";
  }
}
