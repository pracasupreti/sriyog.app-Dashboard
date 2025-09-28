import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// Example data type
type Professional = {
  id: number;
  name: string;
  city: string;
  profession: string;
  submittedDate: string;
  gender: string;
  headshot: string;
};

// Example data (replace with your API data)
const data: Professional[] = [
  {
    id: 1,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/user/user-circle.svg",
  },
  // ...add more rows as needed
];

// Column definitions
const columns: ColumnDef<Professional>[] = [
  { accessorKey: "id", header: "Waiting ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "profession", header: "Profession" },
  { accessorKey: "submittedDate", header: "Submitted Date" },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "headshot",
    header: "Headshot",
    cell: info => (
      <img
        src={info.getValue() as string}
        alt="headshot"
        className="w-8 h-8 rounded-full mx-auto"
      />
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <button className="text-red-500 hover:text-red-700">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    ),
  },
];

export default function WaitingProfessionalsTable() {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          value={globalFilter ?? ""}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="border rounded px-3 py-1 w-1/3"
        />
        {/* Add dropdowns for filters here if needed */}
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-red-900 text-white">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-3 py-2 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-red-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded"
          >
            Next
          </button>
        </div>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
