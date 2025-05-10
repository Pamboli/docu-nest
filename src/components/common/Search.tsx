"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  placeholder?: string;
};

export function Search({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex h-11 mb-4 rounded-md border items-center border-gray-300 px-3 bg-background outline-accent focus-within:outline">
      <SearchIcon className="text-gray-500 mr-3" strokeWidth={1.5} />
      <input
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full outline-none"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
