"use client";

import { clsx } from "clsx";
import { Eye, EyeClosed, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { InputWrapper, InputWrapperProps } from "./InputWrapper";

type Props = InputWrapperProps & {
  placeholder?: string;
  type?: "text" | "password" | "email";
  icon?: LucideIcon;
  defaultValue?: string;
};

function Input({
  name,
  placeholder,
  type,
  icon,
  error,
  defaultValue,
  ...props
}: Props) {
  const InputIcon = icon;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const internalType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <InputWrapper name={name} error={error} {...props}>
      <div
        className={clsx(
          "flex h-11 rounded-md border items-center border-gray-300 px-3 bg-background",
          {
            "outline outline-red-600": !!error,
            "outline-accent focus-within:outline": !error,
          }
        )}
      >
        {InputIcon && (
          <InputIcon className="text-gray-500 mr-3" strokeWidth={1.5} />
        )}
        <input
          defaultValue={defaultValue}
          className="w-full outline-none"
          name={name}
          placeholder={placeholder}
          type={internalType}
        />
        {type === "password" && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsPasswordVisible((old) => !old)}
          >
            {!isPasswordVisible && <Eye />}
            {isPasswordVisible && <EyeClosed />}
          </button>
        )}
      </div>
    </InputWrapper>
  );
}

export { Input };
