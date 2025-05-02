import { Logo } from "@/components/common/Logo";
import { LoginForm } from "@/components/login/LoginForm";
import { SearchParams } from "@/types/page";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";

export default async function LoginPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const nextUrl =
    typeof searchParams.nextUrl === "string"
      ? searchParams.nextUrl
      : ROUTES.HOME;

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="border-gray-300 p-10 rounded-md shadow flex flex-col">
        <div className="mb-10">
          <p className="font-semibold text-3xl mb-1">¡Bienvenido!</p>
          <p className="text-gray-500">Inicia sesión con tu contraseña</p>
        </div>
        <LoginForm nextUrl={nextUrl} />
      </div>
      <div className="mt-6 flex gap-2">
        <p>¿Nuevo en DocuNest?</p>
        <Link className="text-primary hover:underline" href={ROUTES.SIGNIN}>
          Crea una cuenta
        </Link>
      </div>
    </main>
  );
}
