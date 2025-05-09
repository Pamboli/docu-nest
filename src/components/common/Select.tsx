import { clsx } from "clsx";
import { InputWrapper, InputWrapperProps } from "./InputWrapper";
import { ChevronDown, LucideIcon } from "lucide-react";

export type SelectItem = {
  label: string;
  value: string;
};

type Props = InputWrapperProps & {
  data: SelectItem[];
  itemsHeader?: string;
  icon?: LucideIcon;
  defaultValue?: string;
};

export function Select({
  name,
  data,
  itemsHeader,
  error,
  icon,
  defaultValue,
  ...props
}: Props) {
  const InputIcon = icon;

  return (
    <InputWrapper name={name} error={error} {...props}>
      <div className="relative">
        {InputIcon && (
          <InputIcon
            className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none"
            size={24}
            strokeWidth={1.5}
          />
        )}
        <select
          key={defaultValue}
          className={clsx(
            "peer appearance-none w-full h-11 rounded-md border px-3 border-gray-300 bg-background outline-accent focus-within:outline",
            icon && "pl-12",
            {
              "outline outline-red-600": !!error,
              "outline-accent focus-within:outline": !error,
            }
          )}
          defaultValue={defaultValue}
          name={name}
        >
          {itemsHeader && (
            <option value="" disabled>
              {itemsHeader}
            </option>
          )}
          {data.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={24}
          className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </InputWrapper>
  );
}
