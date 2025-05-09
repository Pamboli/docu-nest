import { ReactNode } from "react";
import { FormError } from "./FormError";

export type InputWrapperProps = {
  label?: string;
  error?: string;
  name: string;
  helpText?: string;
};

type Props = InputWrapperProps & { children: ReactNode };

export function InputWrapper({
  label,
  name,
  error,
  helpText,
  children,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start gap-1 text-start">
      {label && (
        <label className="font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <FormError>{error}</FormError>
      ) : (
        helpText && <span className="text-gray-500 text-sm">{helpText}</span>
      )}
    </div>
  );
}
