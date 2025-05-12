import {
  getAccessToken,
  getUserIdFromToken,
} from "@/lib/services/auth.service";
import { getDocuments } from "@/lib/services/document.service";
import { DocumentsEmptyState } from "./DocumentsEmptyState";
import { DocumentDto } from "@/lib/dto/documents.dto";
import { DocumentTableActions } from "./DocumentTableActions";
import { Calendar, FileIcon, FileText, ReceiptEuro } from "lucide-react";
import { DocumentType } from "../../../prisma/generated";
import { Column, Table } from "../common/Table";

type Props = {
  query: string;
  currentPage: number;
  itemsPerPage: number;
};

function getDocumentTypeIcon(type: DocumentType) {
  switch (type) {
    case "INVOICE":
      return ReceiptEuro;
    case "REPORT":
      return FileText;
  }
}

function getDocumentTypeLabel(type: DocumentType) {
  switch (type) {
    case "INVOICE":
      return "Factura";
    case "REPORT":
      return "Informe";
  }
}

const columns: Column<DocumentDto>[] = [
  {
    key: "name",
    label: "Nombre",
    cell: ({ name }) => (
      <div className="flex items-center gap-2">
        <FileIcon strokeWidth={1.5} size={20} />
        <p>{name}</p>
      </div>
    ),
  },
  {
    key: "description",
    label: "Descripción",
    cell: ({ description }) => description,
  },
  {
    key: "type",
    label: "Tipo de documento",
    cell: ({ type }) => {
      const Icon = getDocumentTypeIcon(type);
      return (
        <div className="flex border-1 p-2 rounded-md items-center gap-2 border-gray-300 w-fit">
          <Icon strokeWidth={1.5} size={20} />
          <p>{getDocumentTypeLabel(type)}</p>
        </div>
      );
    },
  },
  {
    key: "updatedAt",
    label: "Última modificación",
    cell: ({ updatedAt }) => (
      <div className="flex items-center gap-2">
        <Calendar strokeWidth={1.5} size={20} />
        <p>{updatedAt.toLocaleDateString()}</p>
      </div>
    ),
  },
  {
    key: "action",
    cell: (row) => <DocumentTableActions documentId={row.id} />,
  },
];

export async function DocumentsTable({
  query,
  currentPage,
  itemsPerPage,
}: Props) {
  const token = await getAccessToken();
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const documents = await getDocuments(userId, {
    page: currentPage,
    itemsPerPage,
    query,
  });

  if (documents.length === 0) {
    return <DocumentsEmptyState />;
  }

  return (
    <div className="my-4">
      <Table data={documents} columns={columns} />
    </div>
  );
}
