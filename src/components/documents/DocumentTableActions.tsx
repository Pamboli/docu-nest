"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { IconButton } from "../common/IconButton";
import { ROUTES } from "@/utils/utils";
import { DeleteDocumentButton } from "./DeleteDocumentButton";

type Props = {
  documentId: string;
  name: string;
};

export function DocumentTableActions({ documentId, name }: Props) {
  return (
    <div className="flex gap-2 justify-end items-center">
      <IconButton
        icon={SquareArrowOutUpRight}
        href={`${ROUTES.DOCUMENTS}/${documentId}`}
      />
      <DeleteDocumentButton iconButton documentId={documentId} name={name} />
    </div>
  );
}
