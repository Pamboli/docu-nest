import { type PropsWithChildren } from "react";

import { clsx } from "clsx";
import { Spinner } from "./Spinner";
import Link from "next/link";

type Props = {
  noGrow?: boolean;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
} & (
  | {
      type?: "submit" | "reset" | "button";
      onClick?: () => void;
      href?: never;
    }
  | {
      type?: never;
      onClick?: never;
      href: string;
    }
);

function getVariant(variant: Props["variant"]) {
  return clsx(
    "text-nowrap rounded-md px-4 flex items-center gap-2 justify-center font-medium transition-colors h-11 cursor-pointer",
    {
      "hover:bg-primary-hover bg-primary text-background":
        variant === "primary",
      "hover:bg-gray-300 bg-gray-200 text-gray-600 border border-gray-300":
        variant === "secondary",
      "hover:bg-red-800 bg-red-700 text-background": variant === "danger",
    }
  );
}

function Button({
  variant = "primary",
  children,
  type = "submit",
  loading,
  href,
  noGrow = false,
  onClick,
}: PropsWithChildren<Props>) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(getVariant(variant), !noGrow && "w-full")}
      >
        {loading ? <Spinner /> : children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(getVariant(variant), !noGrow && "w-full")}
      type={type}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

export { Button, getVariant };
