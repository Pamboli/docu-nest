import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AddDocumentForm } from "@/components/documents/AddDocumentForm";
import { ROUTES } from "@/utils/utils";

export default function AddDocumentPage() {
  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: "Documentos", href: ROUTES.DOCUMENTS },
          { label: "Añadir documento", active: true },
        ]}
      />
      <AddDocumentForm />
    </main>
  );
}
