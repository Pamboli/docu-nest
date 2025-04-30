import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function FormError({ children }: Props) {
  return <p className="text-sm text-red-600">{children}</p>;
}
