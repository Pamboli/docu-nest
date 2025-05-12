import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/common/Button";
import { DocumentIdCopy } from "@/components/documents/DocumentIdCopy";
import { DownloadFileButton } from "@/components/documents/DownloadFileButton";
import {
  getAccessToken,
  getUserIdFromToken,
} from "@/lib/services/auth.service";
import { getDocumentById } from "@/lib/services/document.service";
import { ROUTES } from "@/utils/utils";
import { EditIcon, FileMinus } from "lucide-react";

export default async function DocumentDetailPage(props: {
  params: Promise<{ documentId: string }>;
}) {
  const token = await getAccessToken();
  const userId = await getUserIdFromToken(token);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const documentId = (await props.params).documentId;
  const document = await getDocumentById(documentId, userId);

  const details = [
    { label: "Descripción", value: document.description ?? "" },
    {
      label: "Tipo de documento",
      value: document.type === "INVOICE" ? "Factura" : "Reporte",
    },
    { label: "Añadido el", value: document.createdAt.toLocaleDateString() },
    {
      label: "Última modificación",
      value: document.updatedAt.toLocaleDateString(),
    },
  ];

  return (
    <main className="h-full">
      <Breadcrumb
        breadcrumbs={[
          { label: "Documentos", href: ROUTES.DOCUMENTS },
          { label: "Detalle del Documento", active: true },
        ]}
      />
      <div className="flex gap-12 h-full">
        <div className="w-1/3 flex flex-col gap-4">
          <section className="bg-gray-200 p-4 rounded-md shadow flex flex-col h-fit">
            <h2 className="text-2.5-xl font-medium">{document.name}</h2>
            <DocumentIdCopy documentId={documentId} />
            <table className="my-10">
              <tbody>
                {details.map(({ label, value }, idx) => (
                  <tr key={label}>
                    <td
                      className={`py-4 border-gray-400 font-medium ${
                        idx < details.length - 1 && "border-b"
                      }`}
                    >
                      {label}
                    </td>
                    <td
                      className={`py-4 border-gray-400 ${
                        idx < details.length - 1 && "border-b"
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 justify-end">
              <Button href={`/documents/${documentId}/edit`}>
                <EditIcon />
                <p>Editar documento</p>
              </Button>
              <Button type="button" variant="danger">
                <FileMinus />
                <p>Eliminar documento</p>
              </Button>
            </div>
          </section>
          <DownloadFileButton
            url={document.url}
            filename={document.originalFileName}
          />
        </div>
        <section className="flex-1 h-full">
          <iframe className="w-full h-11/12" src={document.url} />
        </section>
      </div>
    </main>
  );
}
