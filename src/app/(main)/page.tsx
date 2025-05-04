import { uploadFile } from "@/lib/actions/document.action";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action={uploadFile} className="flex flex-col gap-[32px]">
          <label htmlFor="file">Choose a file:</label>
          <input type="file" id="file" name="file" accept=".txt" />
          <button>Send</button>
        </form>
      </main>
    </div>
  );
}
