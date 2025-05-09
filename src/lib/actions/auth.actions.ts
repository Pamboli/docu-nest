"use server";

import { FormState } from "@/types/form";
import { LoginFormSchema, SigninFormSchema } from "../schemas/auth.schemas";
import { z } from "zod";
import { redirect } from "next/navigation";
import { createUser, verifyLogin } from "../services/auth.service";
import { cookies } from "next/headers";
import { ACCESS_TOKEN, ROUTES } from "@/utils/constants";

type LoginState = FormState<null, z.infer<typeof LoginFormSchema>>;
type SigninState = FormState<null, z.infer<typeof SigninFormSchema>>;

export async function login(
  _: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const { success, data, error } = LoginFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { error: error.flatten().fieldErrors };
  }

  try {
    const token = await verifyLogin(data);
    await setAccessToken(token);
  } catch {
    return { error: { root: "El usuario o la contraseña no es correcta" } };
  }

  if (data.nextUrl) {
    redirect(data.nextUrl);
  }

  return { data: null };
}

export async function signin(
  _: LoginState | undefined,
  formData: FormData
): Promise<SigninState> {
  const { success, data, error } = SigninFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      error: error.flatten().fieldErrors,
    };
  }

  const token = await createUser(data);
  await setAccessToken(token);

  redirect(ROUTES.HOME);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);

  redirect(ROUTES.LOGIN);
}

async function setAccessToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, token, { secure: true, httpOnly: true });
}
