import { logout } from "@/lib/actions/auth.actions";
import { Button } from "../common/Button";
import { Logo } from "../common/Logo";
import { Navigation } from "./Navigation";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";
import { Power } from "lucide-react";

export function SideMenu() {
  return (
    <aside className="flex-col flex gap-12 h-full p-4 min-w-2xs">
      <Link href={ROUTES.HOME}>
        <Logo />
      </Link>
      <Navigation />
      <form action={logout} className="w-full">
        <Button>
          <Power />
          <p>Cerrar sesión</p>
        </Button>
      </form>
    </aside>
  );
}
