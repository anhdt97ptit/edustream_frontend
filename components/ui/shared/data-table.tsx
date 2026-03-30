'use client'

import React, { useMemo } from 'react'
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  Table as TTable,
  VisibilityState,
  Row,
} from '@tanstack/react-table'
export type { Row } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Skeleton } from '../skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { LayoutGrid, Loader } from 'lucide-react'

export type DataTableChildren<TData> = (_table: TTable<TData>) => React.ReactNode
export type {
  ColumnDef as DataTableColumnDef,
  OnChangeFn as DataTableOnChangeFn,
  SortingState as DataTableSortingState,
} from '@tanstack/react-table'
export interface DataTableProps<TData, TValue> {
  emptyLabel?: string
  columns: ColumnDef<TData, TValue>[]
  columnVisibility?: VisibilityState
  data: TData[]
  perPage?: number
  totalPages?: number
  enableRowSelection?: (row: Row<TData>) => boolean
  onClearFilters?: () => void
  hasFilters?: boolean
  children?: DataTableChildren<TData>
  skeleton?: {
    enable: boolean
    rows: number
    component?: React.ReactNode
  }
  error?: {
    enable: boolean
    component?: React.ReactNode
  }
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  onSelectedRowChange?: (rows: Row<TData>[]) => void
  isPending?: boolean
  // New prop: a callback to render a sub-component for an expanded row
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode
}

export function DataTable<TData, TValue>({
  emptyLabel = 'Không có kết quả được tìm thấy',
  columns,
  columnVisibility,
  data,
  error,
  perPage,
  totalPages,
  skeleton,
  hasFilters,
  onClearFilters,
  sorting,
  onSortingChange,
  children,
  isPending,
  enableRowSelection,
  onSelectedRowChange,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  const pagination = useMemo<PaginationState>(() => {
    return {
      pageIndex: 0,
      pageSize: perPage || 10,
    }
  }, [perPage])

  const manualPagination = Boolean(totalPages !== undefined)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: pagination,
      columnVisibility,
      sorting,
    },
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    pageCount: totalPages,
    enableRowSelection: enableRowSelection || true,
  })

  const selectedRows = table.getSelectedRowModel().rows

  React.useEffect(() => {
    onSelectedRowChange?.(selectedRows)
  }, [selectedRows])

  return (
    <>
      <div className="relative rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: `${cell.column.getSize()}px`,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <tr>
                      {/* 2nd row: single cell spanning all columns */}
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent && renderSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : error?.enable ? (
              <TableRow>
                {error.component ?? (
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    Something went wrong.
                  </TableCell>
                )}
              </TableRow>
            ) : skeleton?.enable ? (
              Array.from({ length: skeleton.rows }).map((_, i) => (
                <TableRow key={`skeleton-row-${i}`}>{skeleton.component ?? <Skeleton />}</TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div
                    className="flex h-60 flex-col items-center justify-center gap-y-4 text-muted-foreground/60"
                    data-testid="empty-document-state"
                  >
                    <LayoutGrid className="h-12 w-12" strokeWidth={1.5} />

                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{emptyLabel}</h3>

                      <p className="mt-2 max-w-[60ch]">
                        Tất cả đã được dọn dẹp. Chờ tạo mới để xem danh sách ở đây.
                      </p>
                    </div>
                  </div>
                  {hasFilters && onClearFilters !== undefined && (
                    <button
                      onClick={() => onClearFilters()}
                      className="mt-1 text-sm text-foreground"
                    >
                      Clear filters
                    </button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {children && <div className="mt-8 w-full">{children(table)}</div>}
    </>
  )
}
