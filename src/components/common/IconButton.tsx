"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
} & (
  | { type?: "submit" | "reset" | "button"; onClick?: () => void; href?: never }
  | { type?: never; onClick?: never; href?: string }
);

export function IconButton({ icon, onClick, href, type = "submit" }: Props) {
  const Icon = icon;
  const className =
    "border-2 border-gray-200 p-2 rounded-md hover:bg-gray-200 transition-colors";

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon size={20} />
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      <Icon size={20} />
    </button>
  );
}
