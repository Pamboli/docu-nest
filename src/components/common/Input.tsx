"use client";

import { clsx } from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FormError } from "./FormError";

type Props = {
  label?: string;
  error?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password";
};

function Input({ error, label, name, placeholder, type = "text" }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const internalType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="flex w-full flex-col justify-start gap-0.5 text-start">
      {label && (
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex h-11 rounded-md border border-gray-300 px-3 py-2 outline-2 -outline-offset-1",
          {
            "outline outline-red-600": !!error,
            "outline-accent focus-within:outline": !error,
          }
        )}
      >
        <input
          className="w-full outline-none"
          name={name}
          placeholder={placeholder}
          type={internalType}
        />
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setIsPasswordVisible((old) => !old)}
        >
          {type === "password" && !isPasswordVisible && <Eye />}
          {type === "password" && isPasswordVisible && <EyeClosed />}
        </button>
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  );
}

export { Input };
