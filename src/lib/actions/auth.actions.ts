"use server";

import { FormState } from "@/types/form";
import { LoginFormSchema } from "../schemas/auth.schemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { verifyLogin } from "../services/auth.service";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/utils/constants";

type LoginState = FormState<null, z.infer<typeof LoginFormSchema>>;

export async function login(
  _: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const validateFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    const token = await verifyLogin(validateFields.data.password);
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN, token, { secure: true, httpOnly: true });
  } catch {
    return { error: { root: "La contraseña no es correcta" } };
  }

  if (validateFields.data.nextUrl) {
    redirect(validateFields.data.nextUrl);
  }

  return { success: null };
}
