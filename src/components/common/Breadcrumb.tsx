import Link from "next/link";
import { PageTitle } from "./PageTitle";
import { domine } from "@/utils/fonts";

type Props = {
  breadcrumbs: Breadcrumb[];
};

type Breadcrumb =
  | {
      label: string;
      active: true;
      href?: never;
    }
  | {
      label: string;
      active?: false;
      href: string;
    };

export function Breadcrumb({ breadcrumbs }: Props) {
  return (
    <nav className="mb-12" aria-label="breadcrumb">
      <ol className="flex gap-3">
        {breadcrumbs.map((bc, idx) => (
          <li key={`${idx}-${bc.href}`}>
            {bc.active ? (
              <PageTitle>{bc.label}</PageTitle>
            ) : (
              <Link
                className={`text-[28px] font-medium text-gray-500 ${domine.className}`}
                href={bc.href}
              >
                {bc.label}
              </Link>
            )}
            {idx < breadcrumbs.length - 1 && (
              <span className="ml-3 text-[28px] font-medium">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
