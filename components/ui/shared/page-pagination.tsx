'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  meta: {
    count: number
    last_page: number
    current_page: number
    per_page: number
    total: number
  }
  pathname: string
  searchParams: { [key: string]: any }
}

export default function PagePaginationComponent({ meta, pathname, searchParams }: PaginationProps) {
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first page, last page, and pages around current page
    const pages = []
    const showEllipsisStart = meta.current_page > 3
    const showEllipsisEnd = meta.current_page < meta.last_page - 2

    // Always show page 1
    pages.push(1)

    // Show ellipsis if needed at the start
    if (showEllipsisStart) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Show pages around current page
    for (
      let i = Math.max(2, meta.current_page - 1);
      i <= Math.min(meta.last_page - 1, meta.current_page + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    // Show ellipsis if needed at the end
    if (showEllipsisEnd) {
      pages.push(-2) // -2 represents ellipsis at the end
    }

    // Always show last page if it's not already included
    if (meta.last_page > 1 && !pages.includes(meta.last_page)) {
      pages.push(meta.last_page)
    }

    return pages
  }

  const pages = generatePagination()

  return (
    <Pagination>
      <PaginationContent>
        {meta.current_page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(meta.current_page - 1)} />
          </PaginationItem>
        )}

        {pages.map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink href={createPageURL(page)} isActive={page === meta.current_page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {meta.current_page < meta.last_page && (
          <PaginationItem>
            <PaginationNext href={createPageURL(meta.current_page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
