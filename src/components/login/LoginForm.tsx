"use client";

import { useActionState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { login } from "@/lib/actions/auth.actions";

type Props = {
  nextUrl: string;
};

export function LoginForm({ nextUrl }: Props) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 min-w-96">
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        error={state?.error?.email?.[0]}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        error={state?.error?.password?.[0]}
      />
      <input type="hidden" name="nextUrl" defaultValue={nextUrl} />
      <Button loading={pending}>Iniciar sesión</Button>
      {state?.error?.root && (
        <p className="text-sm text-red-600">{state.error.root}</p>
      )}
    </form>
  );
}
