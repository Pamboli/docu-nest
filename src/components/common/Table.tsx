import { clsx } from "clsx";
import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | "action";
  label?: string;
  cell: (row: T) => ReactNode;
};

type Data<T> = T & { id: string };

type Props<T> = {
  data: Data<T>[];
  columns: Column<T>[];
};

export function Table<T>({ data, columns }: Props<T>) {
  return (
    <div className="rounded-lg bg-gray-200 p-2">
      <table className="min-w-full">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            {columns.map((col) => (
              <th
                className="px-3 py-5 font-medium"
                key={col.key.toString()}
                scope="col"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              className="table-row w-full border-b-2 border-gray-200 py-3 text-sm last-of-type:border-none overflow-hidden"
              key={row.id}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={`${col.key.toString()}-${row.id}`}
                  className={clsx(
                    "whitespace-nowrap py-3 px-3 bg-background",
                    colIdx === 0 && rowIdx === 0 && "rounded-tl-lg",
                    colIdx === columns.length - 1 &&
                      rowIdx === 0 &&
                      "rounded-tr-lg",
                    colIdx === 0 &&
                      rowIdx === data.length - 1 &&
                      "rounded-bl-lg",
                    colIdx === columns.length - 1 &&
                      rowIdx === data.length - 1 &&
                      "rounded-br-lg"
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
