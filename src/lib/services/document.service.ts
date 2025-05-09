import { z } from "zod";
import { AddDocumentFormSchema } from "../schemas/document.schemas";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { mkdir } from "fs/promises";
import prisma from "../prisma";

const FILE_STORAGE_PATH = process.env.FILE_STORAGE_PATH;

type AddDocumentType = z.infer<typeof AddDocumentFormSchema> & {
  userId: string;
};

export async function postDocument({
  file,
  userId,
  name,
  description,
  fileType,
}: AddDocumentType) {
  const filePath = await saveFileToStorage(file, userId);

  await prisma.document.create({
    data: {
      fileName: file.name,
      filePath,
      name,
      description,
      type: fileType,
      ownerId: userId,
    },
  });
}

async function saveFileToStorage(file: File, userId: string) {
  if (!FILE_STORAGE_PATH) {
    const error = "Storage path not found";
    console.error(error);
    throw new Error(error);
  }

  const bufferArray = await file.arrayBuffer();
  const buffer = Buffer.from(bufferArray);

  const extension = path.extname(file.name);
  const uniqueName = `${Date.now()}-${randomUUID()}${extension}`;

  const userDir = path.join(FILE_STORAGE_PATH, userId);
  const filePath = path.join(userDir, uniqueName);

  await mkdir(userDir, { recursive: true });
  await writeFile(filePath, buffer);

  return filePath;
}
