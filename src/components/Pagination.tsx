import { useMemo } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const paginationRange = useMemo(() => {
    if (lastPage <= 6) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first 2
    pages.push(1, 2);

    // Left ellipsis
    if (currentPage > 4) {
      pages.push("...");
    }

    // Current page +/- 1
    const start = Math.max(3, currentPage - 1);
    const end = Math.min(lastPage - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right ellipsis
    if (currentPage < lastPage - 3) {
      pages.push("...");
    }

    // Always show last 2
    pages.push(lastPage - 1, lastPage);

    return pages;
  }, [currentPage, lastPage]);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <RiArrowLeftSLine size={20} />
      </button>

      {/* pagese */}
      {paginationRange.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`w-8 h-8 flex justify-center items-center poppins-medium text-sm text-[#212B36] px-3 py-1 border rounded cursor-pointer ${
              page === currentPage
                ? "border-[#FF4000] text-[#FF4000]"
                : "border-[#F8F6F7]"
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <RiArrowRightSLine size={20} />
      </button>
    </div>
  );
}
