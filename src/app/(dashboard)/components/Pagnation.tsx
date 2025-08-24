"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationforAllComponents({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = page;
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // console.log(searchParams);
  // // console.log(pathname);
  // console.log(createPageURL);
  // console.log(totalPages);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pageNumbers);

  return (
    <Pagination className="mt-4">
      <PaginationContent className="flex justify-between items-center w-full">
        {/* Previous button - forced to start */}
        <PaginationItem className="order-first">
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* Page numbers - centered group */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </div>

        {/* Next button - forced to end */}
        <PaginationItem className="order-last">
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
