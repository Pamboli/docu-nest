"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { IconButton } from "./IconButton";
import { usePathname, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";

type Props = {
  totalPages: number;
};

function createPagination(totalPages: number, currentPage: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function Pagination({ totalPages }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page") ?? 1);

  function getPaginatedUrl(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const pages = createPagination(totalPages, currentPage);

  return (
    <nav className="flex items-center gap-3 justify-center">
      <IconButton
        icon={ArrowLeft}
        href={getPaginatedUrl(currentPage - 1)}
        disabled={currentPage <= 1}
      />
      <div className="flex items-center">
        {pages.map((page, idx) => {
          const className = clsx(
            "size-10 border-1 border-r-0 flex items-center justify-center",
            {
              "rounded-l-md": idx === 0,
              "border-r-2 rounded-r-md": idx === pages.length - 1,
              "border-gray-200": currentPage !== page,
              "hover:bg-gray-200": page !== "..." && page !== currentPage,
              "border-primary bg-primary text-background": currentPage === page,
            }
          );

          const key = `${page}-${idx}`;

          if (currentPage === page || typeof page !== "number") {
            return (
              <div key={key} className={className}>
                {page}
              </div>
            );
          }

          return (
            <Link key={key} href={getPaginatedUrl(page)} className={className}>
              {page}
            </Link>
          );
        })}
      </div>
      <IconButton
        icon={ArrowRight}
        href={getPaginatedUrl(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
}
