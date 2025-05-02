import { Logo } from "@/components/common/Logo";
import { SigninForm } from "@/components/signin/SigninForm";

export default function SigninPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <div className="border-gray-300 p-10 rounded-md shadow flex flex-col">
        <div className="mb-10">
          <p className="font-semibold text-3xl mb-1">¡Bienvenido!</p>
          <p className="text-gray-500">Crea tu cuenta</p>
        </div>
        <SigninForm />
      </div>
    </main>
  );
}
