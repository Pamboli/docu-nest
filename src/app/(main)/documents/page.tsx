import { PageTitle } from "@/components/common/PageTitle";
import { Search } from "@/components/common/Search";
import { DocumentsTable } from "@/components/documents/DocumentsTable";
import { DocumentsTableSkeleton } from "@/components/documents/DocumentsTableSkeleton";
import { getDocumentPages } from "@/lib/services/document.service";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 10;

export default async function DocumentsPage(props: {
  searchParams?: { query?: string; page?: number };
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";

  const totalPages = await getDocumentPages(query, ITEMS_PER_PAGE);
  console.log("🚀 ~ totalPages:", totalPages);

  return (
    <main className="flex flex-col h-full">
      <PageTitle>Documentos</PageTitle>
      <Search placeholder="Busca un documento..." />
      <Suspense fallback={<DocumentsTableSkeleton />}>
        <DocumentsTable
          query={query}
          currentPage={1}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Suspense>
    </main>
  );
}
