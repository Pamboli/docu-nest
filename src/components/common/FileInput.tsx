"use client";

import { FileIcon } from "lucide-react";
import { InputWrapper, InputWrapperProps } from "./InputWrapper";
import { useEffect, useRef, useState } from "react";

type Props = InputWrapperProps & {
  multiple?: boolean;
  accept?: string;
};

const DEFAULT_TEXT = "No se ha seleccionado ningún archivo.";
const MULTIPLE_TEXT = "archivos seleccionados.";

export function FileInput({ multiple, accept, name, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileText, setFileText] = useState(DEFAULT_TEXT);

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      console.log("🚀 ~ useEffect ~ input:", input.files);
    }
  }, [inputRef]);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    const onInputChangeHandler = () => {
      const files = input.files;
      if (!files || files.length < 1) {
        setFileText(DEFAULT_TEXT);
      } else if (files.length > 1) {
        setFileText(`${files.length} ${MULTIPLE_TEXT}`);
      } else {
        setFileText(files[0].name);
      }
    };

    input.addEventListener("change", onInputChangeHandler);

    return () => {
      input.removeEventListener("change", onInputChangeHandler);
    };
  }, [inputRef, setFileText]);

  return (
    <InputWrapper name={name} {...props}>
      <div className="flex pr-3 rounded-md h-11 w-full bg-background border border-gray-300 items-center overflow-hidden">
        <label
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          tabIndex={0}
          className="flex focus:bg-blue-300 focus:font-medium items-center gap-2 bg-primary text-background h-full px-3 cursor-pointer"
        >
          <FileIcon />
          Examinar...
          <input
            name={name}
            accept={accept}
            multiple={multiple}
            ref={inputRef}
            type="file"
            hidden
          />
        </label>
        <span className="ml-3">{fileText}</span>
      </div>
    </InputWrapper>
  );
}
