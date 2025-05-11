import { Button } from "@/components/common/Button";
import { PageTitle } from "@/components/common/PageTitle";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/Search";
import { DocumentsTable } from "@/components/documents/DocumentsTable";
import { DocumentsTableSkeleton } from "@/components/documents/DocumentsTableSkeleton";
import { getDocumentPages } from "@/lib/services/document.service";
import { ROUTES } from "@/utils/utils";
import { FilePlus } from "lucide-react";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 10;

export default async function DocumentsPage(props: {
  searchParams?: { query?: string; page?: number };
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const totalPages = await getDocumentPages(query, ITEMS_PER_PAGE);
  const currentPage = Number(searchParams?.page ?? 1);

  return (
    <main className="flex flex-col h-full">
      <PageTitle>Documentos</PageTitle>
      <div className="flex gap-2">
        <Search placeholder="Busca un documento..." />
        <Button noGrow href={ROUTES.DOCUMENTS_ADD}>
          <FilePlus size={18} />
          Añadir documento
        </Button>
      </div>
      <Suspense fallback={<DocumentsTableSkeleton />}>
        <DocumentsTable
          query={query}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
