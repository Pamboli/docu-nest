"use client";

import { FileDown } from "lucide-react";
import { Button } from "../common/Button";

type Props = {
  url: string;
  filename: string;
};

export function DownloadFileButton({ url, filename }: Props) {
  function handleDownload() {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button variant="secondary" type="button" onClick={handleDownload}>
      <FileDown />
      <p>Descargar archivo</p>
    </Button>
  );
}
