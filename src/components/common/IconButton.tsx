"use client";

import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  disabled?: boolean;
} & (
  | { type?: "submit" | "reset" | "button"; onClick?: () => void; href?: never }
  | { type?: never; onClick?: never; href?: string }
);

export function IconButton({
  icon,
  onClick,
  href,
  type = "submit",
  disabled,
}: Props) {
  const Icon = icon;
  const className = clsx(
    "border-2 border-gray-200 p-2 rounded-md transition-colors",
    {
      "hover:bg-gray-200": !disabled,
      "text-gray-300 cursor-default": disabled,
    }
  );

  if (!href || disabled) {
    return (
      <button disabled type={type} className={className} onClick={onClick}>
        <Icon size={20} />
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      <Icon size={20} />
    </Link>
  );
}
