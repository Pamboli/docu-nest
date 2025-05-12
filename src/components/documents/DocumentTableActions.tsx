"use client";

import { SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { IconButton } from "../common/IconButton";
import { ROUTES } from "@/utils/utils";

type Props = {
  documentId: string;
};

export function DocumentTableActions({ documentId }: Props) {
  return (
    <div className="flex gap-2 justify-end items-center">
      <IconButton
        icon={SquareArrowOutUpRight}
        href={`${ROUTES.DOCUMENTS}/${documentId}`}
      />
      <IconButton icon={Trash2} />
    </div>
  );
}
