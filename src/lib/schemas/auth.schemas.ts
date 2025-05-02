import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Introduce el correo" })
    .email("Introduce una dirección de email válida"),
  password: z.string().trim().min(1, { message: "Introduce la contraseña" }),
  nextUrl: z.string().optional(),
});

export const SigninFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Introduce el nombre" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Introduce el correo" })
    .email("Introduce una dirección de email válida"),
  password: z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)",
    }),
});
