import { Box, FilePlus } from "lucide-react";
import { Button } from "../common/Button";
import { ROUTES } from "@/utils/constants";

export function DocumentsEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="p-8 flex flex-col items-center border-2 rounded-xl border-dashed border-primary">
        <Box
          aria-hidden="true"
          size={128}
          strokeWidth={0.5}
          className="text-gray-400"
        />
        <h3 className="mt-2 text-lg font-medium">Todavía no hay documentos</h3>
        <p className="mt-1 mb-4 text-sm text-gray-500">Guarda un documento</p>
        <Button href={ROUTES.DOCUMENTS_ADD}>
          <FilePlus />
          Añadir documento
        </Button>
      </div>
    </div>
  );
}
