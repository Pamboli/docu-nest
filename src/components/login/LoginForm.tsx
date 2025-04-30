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
    <form action={action} method="POST" className="flex flex-col gap-4 w-4/5">
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
