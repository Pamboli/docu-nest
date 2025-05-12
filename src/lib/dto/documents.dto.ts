import { Document } from "../../../prisma/generated";

export type DocumentDto = Omit<
  Document,
  "filePath" | "fileName" | "ownerId" | "originalFileName"
>;

export type DocumentDetailDto = Omit<
  Document,
  "filePath" | "fileName" | "ownerId"
> & { url: string };
