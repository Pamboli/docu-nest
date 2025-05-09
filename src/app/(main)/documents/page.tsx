import { PageTitle } from "@/components/common/PageTitle";
import { DocumentsEmptyState } from "@/components/documents/DocumentsEmptyState";

export default function DocumentsPage() {
  return (
    <main className="flex flex-col h-full">
      <PageTitle>Documentos</PageTitle>
      <DocumentsEmptyState />
    </main>
  );
}
