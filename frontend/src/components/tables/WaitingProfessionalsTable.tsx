import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";
import {
  useReactTable,
  getCoreRowModel,
  // getFilteredRowModel,
  // getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


// Simple, ACTUALLY bulletproof pagination helper
function getPageNumbers(current: number, total: number) {
  const pages: (number | string)[] = [];
  
  if (total <= 7) {
    // If total pages <= 7, show all pages
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // For more than 7 pages, use a simple, reliable pattern
  if (current <= 3) {
    // Near the beginning: 1 2 3 4 5 ... total
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 2) {
    // Near the end: 1 ... (total-4) (total-3) (total-2) (total-1) total
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    // In the middle: 1 ... (current-1) current (current+1) ... total
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return pages;
}

// Updated data type based on API response
type Professional = {
  _id: string;
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  Phone: string;
  Profession: string;
  Gender: string;
  province: string;
  district: string;
  City: string;
  ward: string;
  Area: string;
  referredBy: string;
  dateOfBirth: string;
  bloodGroup: string | null;
  maritalStatus: string | null;
  idType: string;
  Headshot: string;
  idUpload: string;
  "User Type": string;
  "Active in App": string;
  "User Status": string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

// API function with pagination
const fetchWaitingProfessionals = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<{
  data: Professional[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });

    const response = await axiosInstance.get(`/professionaluser/waiting?${params}`);
    
    if (response.data.success) {
      return {
        data: response.data.data || [],
        totalCount: response.data.pagination?.totalCount || 0,
        totalPages: response.data.pagination?.totalPages || 0,
        currentPage: response.data.pagination?.currentPage || 1,
        hasNextPage: response.data.pagination?.hasNextPage || false,
        hasPrevPage: response.data.pagination?.hasPrevPage || false
      };
    }
    
    return {
      data: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false
    };
  } catch (error: unknown) {
    console.error('❌ Failed to fetch waiting professionals:', error);
    throw error;
  }
};

// Column definitions
const columns: ColumnDef<Professional>[] = [
  { 
    accessorKey: "_id", 
    header: "Waiting ID",
    cell: info => {
      const id = info.getValue() as string;
      return id.substring(id.length - 6); // Show last 6 characters of ObjectId
    }
  },
  { 
    accessorKey: "First Name", 
    header: "Name",
    cell: info => {
      const row = info.row.original;
      return `${row["First Name"]} ${row["Middle Name"] || ""} ${row["Last Name"]}`.trim();
    }
  },
  { accessorKey: "City", header: "City" },
  { accessorKey: "Profession", header: "Profession" },
  { 
    accessorKey: "createdAt", 
    header: "Submitted Date",
    cell: info => {
      const date = new Date(info.getValue() as string);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },
  { accessorKey: "Gender", header: "Gender" },
  {
    accessorKey: "Headshot",
    header: "Headshot",
    cell: info => (
      <Image
        src={info.getValue() as string || "/images/defaultlogo.png"}
        alt="headshot"
        width={32}
        height={32}
        className="w-8 h-8 rounded-full mx-auto object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/defaultlogo.png";
        }}
      />
    ),
  },
  {
    id: "action",
    header: "Action",
    
    cell: (info) => {
      const row=info.row.original;
  return ( 
  <button type="button" className="bg-primary hover:bg-red-700  transition-colors duration-300 p-2 rounded-full">
       <Link href={`/waiting-professionals/${row.Phone}`}>
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <path
      d="M9.375 7.80768C9.375 8.30496 9.17746 8.78187 8.82583 9.1335C8.47419 9.48513 7.99728 9.68268 7.5 9.68268C7.00272 9.68268 6.52581 9.48513 6.17417 9.1335C5.82254 8.78187 5.625 8.30496 5.625 7.80768C5.625 7.3104 5.82254 6.83348 6.17417 6.48185C6.52581 6.13022 7.00272 5.93268 7.5 5.93268C7.99728 5.93268 8.47419 6.13022 8.82583 6.48185C9.17746 6.83348 9.375 7.3104 9.375 7.80768Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.25 7.80768C2.25 5.24705 4.585 3.43268 7.5 3.43268C10.415 3.43268 12.75 5.24705 13.75 7.80768C12.75 10.3683 10.415 12.1827 7.5 12.1827C4.585 12.1827 2.25 10.3683 1.25 7.80768Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
       </Link>
      </button>
      )
    },
  },
];

export default function WaitingProfessionalsTable() {

  // State management
  const [data, setData] = useState<Professional[]>([]);
  const [initialLoading, setInitialLoading] = useState(true); // For first load
  const [searchLoading, setSearchLoading] = useState(false); // For search/pagination
  const [error, setError] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  
  // Server-side pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [globalFilter]);

  // Fetch data function with pagination
  const loadData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) {
        setInitialLoading(true);
      } else {
        setSearchLoading(true);
      }
      setError(null);
      
      const result = await fetchWaitingProfessionals(
        pagination.pageIndex + 1, // API expects 1-based page numbers
        pagination.pageSize,
        debouncedSearch
      );
      
      setData(result.data);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      if (isInitial) {
        setInitialLoading(false);
      } else {
        setSearchLoading(false);
      }
    }
  },[pagination.pageIndex, pagination.pageSize, debouncedSearch]);

  // Load data on first mount
  useEffect(() => {
    loadData(true);
  }, []);

  // Load data when pagination or search changes (not initial load)
  useEffect(() => {
    if (!initialLoading) {
      loadData(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch]);

  // Reset to first page when search changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [debouncedSearch]);

  // Table setup with manual pagination
  const table = useReactTable({
    data,
    columns,
    state: { 
      globalFilter,
      pagination 
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Enable manual pagination
    manualFiltering: true,  // Enable manual filtering
    pageCount: totalPages,  // Tell table how many pages exist
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = totalCount;

  // Loading skeleton for initial load
  if (initialLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load data</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => loadData(false)}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2">
      {/* Search bar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative w-full sm:w-1/3">
          <input
            value={globalFilter ?? ""}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search professionals..."
            className="border rounded px-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 pr-8"
          />
          {searchLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            </div>
          )}
        </div>
        <button
          onClick={() => loadData(false)}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          disabled={searchLoading}
        >
          <RefreshCw className={`w-4 h-4 ${searchLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full relative" >
        {/* Loading overlay for search/pagination */}
        {searchLoading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-10 rounded">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading...</span>
            </div>
          </div>
        )}
        <div className="min-w-max">
          <table className="w-full border-separate border-spacing-y-2 text-sm md:text-base">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-red-900 text-white">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-2 md:px-3 py-2 text-left whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No data found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {globalFilter ? 'No results match your search criteria.' : 'No professionals are currently waiting for approval.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="bg-red-100 dark:bg-gray-600 dark:text-white">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-2 md:px-3 py-2 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Custom Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border border-red-800 rounded-lg w-8 h-8 flex items-center justify-center text-red-800 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-150"
            aria-label="Previous page"
          >
           <ChevronLeft className="w-3 h-3"/>
          </button>
          {getPageNumbers(pageIndex + 1, pageCount).map((num, idx) =>
            typeof num === "number" ? (
              <button
                type="button"
                key={`page-${idx}-${num}`}
                onClick={() => table.setPageIndex(num - 1)}
                className={`border rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors duration-150 ${
                  pageIndex + 1 === num
                    ? "bg-red-800 text-white border-red-800 dark:bg-red-700 dark:border-red-600"
                    : "bg-white text-red-800 border-red-800 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
                aria-current={pageIndex + 1 === num ? "page" : undefined}
              >
                {num}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm text-red-800 dark:text-gray-400 select-none">
                ...
              </span>
            )
          )}
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border border-red-800 text-red-800 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium hover:bg-red-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-150"
            aria-label="Next page"
          >
            <ChevronRight className="w-3 h-3"/>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Results: {pageIndex * pageSize + 1}-{Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows}
          </span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={e => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), pageIndex: 0 }))}
              className="appearance-none border border-red-800 bg-red-100 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200 rounded px-3 py-1 text-sm font-medium pr-6 cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-red-800 dark:text-red-200 text-xs">&#9660;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
