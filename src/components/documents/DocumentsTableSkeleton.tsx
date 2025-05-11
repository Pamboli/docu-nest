const Skeleton = ({ className }: { className: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
    <br />
  </div>
);

const SVGSkeleton = ({ className }: { className: string }) => (
  <svg className={className + " animate-pulse rounded bg-gray-300"} />
);

function TableRow() {
  return (
    <tr className="table-row w-full border-b-2 border-gray-200 py-3 last-of-type:border-none">
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <SVGSkeleton className="w-[20px] h-[20px]" />
          <Skeleton className="w-[32px] max-w-full" />
        </div>
      </td>
      <td className="py-3 px-3">
        <Skeleton className="w-[176px] max-w-full" />
      </td>
      <td className="py-3 px-3">
        <div className="flex border-1 rounded-md p-2 items-center gap-2 border-gray-300 w-fit">
          <SVGSkeleton className="lucide-receipt-euro w-[20px] h-[20px]" />
          <Skeleton className="w-[56px] max-w-full" />
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <SVGSkeleton className="w-[20px] h-[20px]" />
          <Skeleton className="w-[64px] max-w-full" />
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex gap-2 justify-end items-center">
          <a className="border-2 rounded-md border-gray-200 p-2 transition-colors">
            <SVGSkeleton className="w-[20px] h-[20px]" />
          </a>
          <div className="border-2 rounded-md border-gray-200 p-2 transition-colors">
            <SVGSkeleton className="lucide-trash-2 w-[20px] h-[20px]" />
          </div>
        </div>
      </td>
    </tr>
  );
}

export function DocumentsTableSkeleton() {
  return (
    <div className="p-2 mt-4">
      <table className="min-w-full">
        <thead className="text-left">
          <tr>
            <th className="px-3 py-5">
              <Skeleton className="w-[48px] max-w-full" />
            </th>
            <th className="px-3 py-5">
              <Skeleton className="w-[88px] max-w-full" />
            </th>
            <th className="px-3 py-5">
              <Skeleton className="w-[136px] max-w-full" />
            </th>
            <th className="px-3 py-5">
              <Skeleton className="w-[152px] max-w-full" />
            </th>
            <th className="px-3 py-5"></th>
          </tr>
        </thead>
        <tbody>
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </div>
  );
}
