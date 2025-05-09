"use client";

import { addDocument } from "@/lib/actions/document.action";
import { useActionState } from "react";
import { FileInput } from "../common/FileInput";
import { Input } from "../common/Input";
import { ACCEPTED_FILE_TYPES } from "@/lib/schemas/document.schemas";
import { BookOpenText, FilePenLine, FileTypeIcon } from "lucide-react";
import { Select } from "../common/Select";
import { DocumentType } from "../../../prisma/generated";
import { Button } from "../common/Button";
import { ROUTES } from "@/utils/constants";
import { FormError } from "../common/FormError";

type FileTypeOption = {
  label: string;
  value: keyof typeof DocumentType;
};

const fileTypeOptions: FileTypeOption[] = [
  {
    value: "INVOICE",
    label: "Factura",
  },
  {
    value: "REPORT",
    label: "Informe",
  },
];

export function AddDocumentForm() {
  const [state, action, pending] = useActionState(addDocument, undefined);

  return (
    <form action={action} key={state?.data?.resetKey}>
      <div className="flex flex-col gap-6 min-w-96 bg-gray-200 p-6 rounded-lg">
        <Input
          defaultValue={state?.data?.name}
          icon={FilePenLine}
          label="Nombre del archivo"
          name="name"
          error={state?.error?.name?.[0]}
        />
        <Input
          defaultValue={state?.data?.description}
          icon={BookOpenText}
          name="description"
          error={state?.error?.description?.[0]}
          label="Descripción"
        />
        <Select
          defaultValue={state?.data?.fileType ?? ""}
          label="Tipo de archivo"
          icon={FileTypeIcon}
          error={state?.error?.fileType?.[0]}
          itemsHeader="Selecciona un tipo de archivo"
          name="fileType"
          data={fileTypeOptions}
        />
        <FileInput
          label="Archivo"
          name="file"
          error={state?.error?.file?.[0]}
          accept={ACCEPTED_FILE_TYPES.join(",")}
          helpText="JPEG, PNG, PDF o TXT (MÁX. 5MB)"
        />
      </div>
      <div className="flex items-center justify-end mt-6 gap-6">
        <Button variant="secondary" noGrow href={ROUTES.DOCUMENTS}>
          Cancelar
        </Button>
        <Button loading={pending} noGrow>
          Añadir documento
        </Button>
      </div>
      {state?.error?.root && <FormError>{state.error.root}</FormError>}
    </form>
  );
}
