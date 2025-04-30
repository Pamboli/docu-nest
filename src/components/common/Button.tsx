import { type PropsWithChildren } from "react";

import { clsx } from "clsx";
import { Spinner } from "./Spinner";

type Props = {
  variant?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
  loading?: boolean;
};

function getVariant(variant: Props["variant"]) {
  return clsx(
    "rounded-md px-4 flex items-center justify-center font-medium transition-colors h-11",
    variant === "primary"
      ? "hover:bg-accent-hover bg-primary text-background"
      : "outline outline-2 -outline-offset-2 outline-gray-900 hover:outline-accent-hover"
  );
}

function Button({
  variant = "primary",
  children,
  type = "submit",
  loading,
}: PropsWithChildren<Props>) {
  return (
    <button className={getVariant(variant)} type={type}>
      {loading ? <Spinner /> : children}
    </button>
  );
}

export { Button, getVariant };
