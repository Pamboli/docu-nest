import { z } from "zod";
import { $Enums } from "../../../prisma/generated";
import { ACCEPTED_FILE_TYPES } from "@/utils/utils";

const MAX_FILE_SIZE_BYTE =
  Number(process.env.MAX_FILE_SIZE_MB ?? 5) * 1024 * 1024;

export const AddDocumentFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Introduce el nombre del documento" }),
  description: z.string().trim().optional(),
  fileType: z.nativeEnum($Enums.DocumentType, {
    message: "Elige un tipo de archivo",
  }),
  file: z
    .instanceof(File, { message: "Debes seleccionar un archivo" })
    .refine((file) => file.size > 0, {
      message: "Debes seleccionar un archivo",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTE, {
      message: "El archivo no puede superar los 5MB",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Tipo de archivo no permitido",
    }),
});

export const DeleteDocumentSchema = z.object({
  documentId: z
    .string()
    .min(1, { message: "Id del documento no encontrado" })
    .uuid("Formato de Id no válido"),
});
