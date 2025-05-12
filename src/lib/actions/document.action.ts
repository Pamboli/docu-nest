"use server";

import { FormState } from "@/types/form";
import { z } from "zod";
import {
  AddDocumentFormSchema,
  DeleteDocumentSchema,
} from "../schemas/document.schemas";
import {
  postDocument,
  deleteDocument as deleteDocumentService,
} from "../services/document.service";
import { cookies } from "next/headers";
import { getUserIdFromToken } from "../services/auth.service";
import { ACCESS_TOKEN, ROUTES } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AddDocumentFormType = z.infer<typeof AddDocumentFormSchema>;
type AddDocumentState = FormState<AddDocumentFormType, AddDocumentFormType>;

type DeleteDocumentType = z.infer<typeof DeleteDocumentSchema>;
type DeleteDocumentState = FormState<null, DeleteDocumentType>;

export async function deleteDocument(
  _: DeleteDocumentState | undefined,
  formData: FormData
): Promise<DeleteDocumentState> {
  const { success, data, error } = DeleteDocumentSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { error: error?.flatten().fieldErrors };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value ?? "";
    const userId = await getUserIdFromToken(token);

    if (!userId) {
      throw new Error("User not found");
    }

    await deleteDocumentService(userId, data.documentId);
  } catch (error) {
    console.error(error);
    return { error: { root: "Error al eliminar el documento" } };
  }

  revalidatePath(ROUTES.DOCUMENTS);
  redirect(ROUTES.DOCUMENTS);
}

export async function addDocument(
  _: AddDocumentState | undefined,
  formData: FormData
): Promise<AddDocumentState> {
  const { success, data, error } = AddDocumentFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      data: {
        ...(Object.fromEntries(formData) as AddDocumentFormType),
        resetKey: Date.now().toString(),
      },
      error: error.flatten().fieldErrors,
    };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value ?? "";
    const userId = await getUserIdFromToken(token);

    if (!userId) {
      throw new Error("User not found");
    }

    await postDocument({ ...data, userId });
  } catch (error) {
    console.error(error);
    return { error: { root: "Error al añadir el documento" } };
  }

  revalidatePath(ROUTES.DOCUMENTS);
  redirect(ROUTES.DOCUMENTS);
}
