import { type PropsWithChildren } from "react";

import { clsx } from "clsx";
import { Spinner } from "./Spinner";
import Link from "next/link";

type Props = {
  noGrow?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
} & (
  | {
      type?: "submit" | "reset" | "button";
      href?: never;
    }
  | {
      type?: never;
      href: string;
    }
);

function getVariant(variant: Props["variant"]) {
  return clsx(
    "text-nowrap rounded-md px-4 flex items-center gap-2 justify-center font-medium transition-colors h-11 cursor-pointer",
    variant === "primary"
      ? "hover:bg-primary-hover bg-primary text-background"
      : "hover:bg-gray-300 bg-gray-200 text-gray-600"
  );
}

function Button({
  variant = "primary",
  children,
  type = "submit",
  loading,
  href,
  noGrow = false,
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
      className={clsx(getVariant(variant), !noGrow && "w-full")}
      type={type}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

export { Button, getVariant };
