import { z } from "zod";

export const LoginFormSchema = z.object({
  password: z.string().trim().min(1, { message: "Introduce la contraseña" }),
  nextUrl: z.string().optional(),
});
