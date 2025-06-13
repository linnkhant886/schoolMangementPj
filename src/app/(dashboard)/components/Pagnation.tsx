import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export default function PaginationforAllComponents() {
    return (
        <Pagination className="mt-4">
        <PaginationContent className="flex justify-between items-center w-full">
          {/* Previous button - forced to start */}
          <PaginationItem className="order-first">
            <PaginationPrevious href="#" />
          </PaginationItem>
          
          {/* Page numbers - centered group */}
          <div className="flex items-center space-x-1">
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </div>
          
          {/* Next button - forced to end */}
          <PaginationItem className="order-last">
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  