"use client";

import { FileMinus, Trash2 } from "lucide-react";
import { Button } from "../common/Button";
import { useActionState, useEffect, useRef } from "react";
import { deleteDocument } from "@/lib/actions/document.action";
import { FormError } from "../common/FormError";
import { IconButton } from "../common/IconButton";

type Props = {
  documentId: string;
  name: string;
  iconButton?: boolean;
};

export function DeleteDocumentButton({ documentId, name, iconButton }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  const [state, action, pending] = useActionState(deleteDocument, undefined);

  useEffect(() => {
    if (!pending) {
      dialog.current?.close();
    }
  }, [pending]);

  return (
    <>
      {iconButton ? (
        <IconButton
          icon={Trash2}
          type="button"
          onClick={() => dialog.current?.showModal()}
        />
      ) : (
        <Button
          onClick={() => dialog.current?.showModal()}
          type="button"
          variant="danger"
        >
          <FileMinus />
          <p>Eliminar documento</p>
        </Button>
      )}
      <dialog
        ref={dialog}
        className="backdrop:bg-black/50 backdrop:backdrop-blur-2xs place-self-center p-4 rounded-md"
      >
        <h4 className="text-2xl font-medium mb-6">{`Eliminar ${name}`}</h4>
        <p>{`¿Quieres eliminar el documento ${name}?`}</p>
        <form action={action} className="mt-6 mb-2 flex gap-4 justify-end">
          <input name="documentId" defaultValue={documentId} hidden />
          <Button
            onClick={() => dialog.current?.close()}
            noGrow
            variant="secondary"
            type="button"
          >
            Cancelar
          </Button>
          <Button loading={pending} noGrow variant="danger" type="submit">
            Eliminar documento
          </Button>
        </form>
        {state?.error?.root && <FormError>{state.error.root}</FormError>}
      </dialog>
    </>
  );
}
