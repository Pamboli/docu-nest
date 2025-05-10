"use client";

import { ROUTES } from "@/utils/utils";
import { clsx } from "clsx";
import { File, House, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = {
  name: string;
  href: keyof typeof ROUTES;
  icon: LucideIcon;
};

const LINKS: Link[] = [
  {
    name: "Inicio",
    href: "HOME",
    icon: House,
  },
  {
    name: "Documentos",
    href: "DOCUMENTS",
    icon: File,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1">
      <ul className="flex flex-col gap-2">
        {LINKS.map(({ href, icon, name }) => {
          const LinkIcon = icon;
          return (
            <Link
              className={clsx(
                "flex gap-2 items-center h-12 px-3 rounded-md font-medium hover:bg-blue-200 hover:text-primary",
                pathname === ROUTES[href] && "text-primary",
                {
                  "bg-gray-200": pathname !== ROUTES[href],
                  "bg-blue-200": pathname === ROUTES[href],
                }
              )}
              key={href}
              href={ROUTES[href]}
            >
              <LinkIcon />
              <p>{name}</p>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
