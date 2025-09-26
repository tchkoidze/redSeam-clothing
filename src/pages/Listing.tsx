import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../APIs";
import type { PriceRange, ProductsApiResponse } from "../types";
import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import productsLogo from "../assets/Products.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PriceFilter from "../components/PriceFilter";
import { Link } from "@tanstack/react-router";
import { useProductFilterDropdown } from "../hooks/useProductFilterDropDoen";
import { IoMdClose } from "react-icons/io";
import { toTitleCase } from "../utils/format";

const sorts = [
  { label: "New products last", value: "created_at" },
  { label: "New products first", value: "-created_at" },
  { label: "Price, low to high", value: "price" },
  { label: "Price, high to low", value: "-price" },
];

export function Listing() {
  const [page, setPage] = useState<number>(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPricetDropdown, setShowPriceDropdown] = useState(false);
  const sortDropdown = useProductFilterDropdown<HTMLDivElement>();
  const priceDropdown = useProductFilterDropdown<HTMLDivElement>();
  const [selectedSort, setSelectedSort] = useState<string>();
  const [priceRange, setPriceRange] = useState<PriceRange>({
    from: null,
    to: null,
  });
  // const [lastNonEmptyData, setLastNonEmptyData] =
  //   useState<ProductsApiResponse>(null);
  console.log("priceRange:", priceRange, "selectedSort:", selectedSort);

  const { data, isFetching } = useQuery<ProductsApiResponse>({
    queryKey: ["products", page, priceRange, selectedSort],
    queryFn: () => fetchProducts(page, priceRange, selectedSort),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.meta.last_page ?? 1;
  console.log("last page: ", data?.meta.last_page);

  const handleNext = () => {
    setPage((p) => (p < totalPages ? p + 1 : p));
  };

  const handlePrev = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  const handlePageClick = (p: number) => {
    if (p !== page) setPage(p);
  };

  // const getPagination = (
  //   page: number,
  //   totalPages: number,
  //   blockSize = 5
  // ): (number | string)[] => {
  //   if (totalPages <= blockSize) {
  //     return Array.from({ length: totalPages }, (_, i) => i + 1);
  //   }

  //   // find current block
  //   const currentBlock = Math.ceil(page / blockSize);
  //   const start = (currentBlock - 1) * blockSize + 1;
  //   const end = Math.min(currentBlock * blockSize, totalPages);

  //   const pages: (number | string)[] = [];

  //   for (let i = start; i <= end; i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };

  // const getPagination = (
  //   page: number,
  //   totalPages: number,
  //   blockSize = 5
  // ): (number | string)[] => {
  //   // Case 1: total pages fit within one block
  //   if (totalPages <= blockSize) {
  //     return Array.from({ length: totalPages }, (_, i) => i + 1);
  //   }

  //   // Case 2: break into blocks
  //   const currentBlock = Math.ceil(page / blockSize);
  //   const start = (currentBlock - 1) * blockSize + 1;
  //   const end = Math.min(currentBlock * blockSize, totalPages);

  //   const pages: (number | string)[] = [];
  //   for (let i = start; i <= end; i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };

  // const getPagination = (
  //   page: number,
  //   totalPages: number,
  //   blockSize = 7,
  //   edgeCount = 2,
  //   minFullBlockSize = 6
  // ): (number | string)[] => {
  //   if (totalPages <= 0) return [];
  //   // clamp page into valid range
  //   page = Math.max(1, Math.min(page, totalPages));

  //   // If total pages fit in one block, show them all
  //   if (totalPages <= blockSize) {
  //     return Array.from({ length: totalPages }, (_, i) => i + 1);
  //   }

  //   const currentBlock = Math.ceil(page / blockSize);
  //   const start = (currentBlock - 1) * blockSize + 1;
  //   const end = Math.min(currentBlock * blockSize, totalPages);
  //   const blockLen = end - start + 1;

  //   // If the block is small, show full contiguous range
  //   if (blockLen <= minFullBlockSize) {
  //     return Array.from({ length: blockLen }, (_, i) => start + i);
  //   }

  //   // Otherwise show: start, start+1, '...', end-1, end
  //   const pages: (number | string)[] = [];
  //   for (let i = 0; i < edgeCount; i++) {
  //     pages.push(start + i);
  //   }
  //   pages.push("...");
  //   for (let i = edgeCount; i > 0; i--) {
  //     pages.push(end - i + 1);
  //   }

  //   return pages;
  // };

  const getPagination = (
    page: number,
    totalPages: number,
    blockSize = 10
  ): (number | string)[] => {
    if (totalPages <= 0) return [];

    // figure out which block
    const currentBlock = Math.ceil(page / blockSize);
    const start = (currentBlock - 1) * blockSize + 1;
    const end = Math.min(currentBlock * blockSize, totalPages);

    // if block small enough, just return full range
    if (end - start + 1 <= 4) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    const pages: (number | string)[] = [];

    // sliding window at block start
    if (page <= start + 1) {
      pages.push(start, start + 1, "...", end - 1, end);
    }
    // sliding window at block end
    else if (page >= end - 1) {
      pages.push(start, start + 1, "...", end - 1, end);
    }
    // sliding window in the middle of the block
    else {
      pages.push(page, page + 1, "...", end - 1, end);
    }

    return pages;
  };

  return (
    <main>
      <div>
        <div className="flex justify-between px-[100px]">
          <p className="poppins-semibold text-[42px] leading-[63px] text-[#10151F]">
            Products
          </p>
          <div className="flex items-center gap-8">
            <p>
              Showing {data?.meta.from}-{data?.meta.to} of 100 results
            </p>
            <span className="w-[1px] h-[14px] bg-[#E1DFE1]"></span>
            <div className="relative" ref={priceDropdown.ref}>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  priceDropdown.setIsOpen((prev) => !prev);
                  sortDropdown.setIsOpen(false);
                }}
              >
                <HiOutlineAdjustmentsHorizontal size={24} />
                Filter
              </button>

              {/* {showPricetDropdown && ( */}
              {priceDropdown.isOpen && (
                <PriceFilter
                  // setShowPriceDropdown={setShowPriceDropdown}
                  setShowPriceDropdown={priceDropdown.setIsOpen}
                  setPriceRange={setPriceRange}
                />
              )}
            </div>

            <div className="relative" ref={sortDropdown.ref}>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  //setShowSortDropdown((prev) => !prev)
                  {
                    sortDropdown.setIsOpen((prev) => !prev);
                    priceDropdown.setIsOpen(false);
                  }
                }
              >
                {selectedSort
                  ? sorts.find((s) => s.value === selectedSort)?.label
                  : "Sort by"}{" "}
                <RiArrowDownSLine size={20} />
              </button>
              {/* {showSortDropdown &&  */}
              {sortDropdown.isOpen && (
                <ul className="w-[223px] absolute right-0 text-left border border-[#E1DFE1] rounded-lg py-4 bg-white">
                  <p className="poppins-semibold text-[#10151F] px-4 py-2">
                    Sort by
                  </p>
                  {sorts.map((sort) => (
                    <li
                      key={sort.label}
                      className="px-4 py-2 cursor-pointer hover:bg-[#E1DFE1]"
                      onClick={() => {
                        setSelectedSort(sort.value);
                        //setShowSortDropdown(false);
                        sortDropdown.setIsOpen(false);
                      }}
                    >
                      {sort.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {priceRange.from && priceRange.from && (
          <button
            onClick={() =>
              setPriceRange({
                from: null,
                to: null,
              })
            }
            className="flex items-center gap-[6px] border border-[#E1DFE1] rounded-[50px] px-4 py-2 mt-5 cursor-pointer"
          >
            <span>
              Price: {priceRange.from}-{priceRange.to}
            </span>
            <IoMdClose size={12} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-[repeat(4,412px)] justify-center gap-6 mt-8">
        {data?.data?.map((product) => (
          <div key={product.id} className="poppins-medium text-lg">
            <Link
              to="/product/$productId"
              params={{ productId: String(product.id) }}
            >
              <img
                src={product.cover_image}
                className="w-[412px] h-[549px] border border-[#E1DFE1] rounded-lg"
              />
            </Link>

            <p className="text-left mt-3 mb-0.5">{toTitleCase(product.name)}</p>
            <p className="text-left text-base">$ {product.price}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1 || isFetching}
          className="cursor-pointer"
        >
          <RiArrowLeftSLine size={20} />
        </button>

        {getPagination(page, totalPages).map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageClick(p as number)}
              disabled={isFetching}
              className={`text-[#212B36] px-3 py-1 border rounded cursor-pointer ${
                p === page
                  ? "border-[#FF4000] text-[#FF4000]"
                  : "border-[#F8F6F7]"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={!data?.meta.last_page || isFetching}
          className="cursor-pointer"
        >
          <RiArrowRightSLine size={20} />
        </button>
      </div>
    </main>
  );
}
