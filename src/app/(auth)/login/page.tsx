import { Logo } from "@/components/common/Logo";
import { LoginForm } from "@/components/login/LoginForm";
import { SearchParams } from "@/types/page";
import { ROUTES } from "@/utils/constants";

export default async function LoginPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const nextUrl =
    typeof searchParams.nextUrl === "string"
      ? searchParams.nextUrl
      : ROUTES.HOME;

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="border-gray-300 py-12 min-w-xl rounded-md shadow flex flex-col gap-13 items-center">
        <Logo />
        <div>
          <p className="font-semibold text-3xl mb-1">¡Bienvenido!</p>
          <p className="text-gray-500">Inicia sesión con tu contraseña</p>
        </div>
        <LoginForm nextUrl={nextUrl} />
      </div>
    </main>
  );
}
