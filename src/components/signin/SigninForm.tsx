"use client";

import { useActionState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { signin } from "@/lib/actions/auth.actions";

export function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 min-w-96">
      <Input label="Nombre" name="name" error={state?.error?.name?.[0]} />
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
      <Button loading={pending}>Crear cuenta</Button>
      {state?.error?.root && (
        <p className="text-sm text-red-600">{state.error.root}</p>
      )}
    </form>
  );
}
