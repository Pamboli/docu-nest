import { Document } from "../../../prisma/generated";

export type DocumentDto = Omit<Document, "filePath" | "fileName" | "ownerId">;
