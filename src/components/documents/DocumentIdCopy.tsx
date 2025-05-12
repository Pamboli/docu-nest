"use client";

import { CopyIcon } from "lucide-react";

type Props = {
  documentId: string;
};

export function DocumentIdCopy({ documentId }: Props) {
  return (
    <div className="font-medium text-gray-500 flex items-center gap-2">
      {`ID: ${documentId}`}
      <button
        onClick={async () => await navigator.clipboard.writeText(documentId)}
        className="cursor-pointer"
      >
        <CopyIcon size={20} />
      </button>
    </div>
  );
}
