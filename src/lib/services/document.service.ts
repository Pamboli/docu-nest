import { z } from "zod";
import { AddDocumentFormSchema } from "../schemas/document.schemas";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { mkdir } from "fs/promises";
import prisma from "../prisma";
import { ListParams } from "@/types/page";
import { Document } from "../../../prisma/generated";
import { DocumentDto } from "../dto/documents.dto";

const FILE_STORAGE_PATH = process.env.FILE_STORAGE_PATH;

type AddDocumentType = z.infer<typeof AddDocumentFormSchema> & {
  userId: string;
};

export async function getDocumentPages(query: string, itemsPerPage: number) {
  const totalItems = await prisma.document.count({
    where: {
      name: {
        contains: query,
      },
    },
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}

export async function getDocuments(
  userId: string,
  { page, itemsPerPage, orderBy, query }: ListParams<Document>
) {
  const skip = itemsPerPage * (page - 1);

  const documents = await prisma.document.findMany({
    where: {
      ownerId: userId,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    skip,
    take: itemsPerPage,
    orderBy,
  });

  return documents.map<DocumentDto>(
    ({ filePath, ownerId, fileName, ...doc }) => doc
  );
}

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
