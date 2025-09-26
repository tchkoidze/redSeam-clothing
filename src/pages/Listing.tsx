import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../APIs";
import type { PriceRange, ProductsApiResponse } from "../types";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PriceFilter from "../components/PriceFilter";
import { Link } from "@tanstack/react-router";
import { useProductFilterDropdown } from "../hooks/useProductFilterDropDoen";
import { IoMdClose } from "react-icons/io";
import { toTitleCase } from "../utils/format";
import { Pagination } from "../components/Pagination";

const sorts = [
  { label: "New products last", value: "created_at" },
  { label: "New products first", value: "-created_at" },
  { label: "Price, low to high", value: "price" },
  { label: "Price, high to low", value: "-price" },
];

export function Listing() {
  const [page, setPage] = useState<number>(1);
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

  const { data, isFetching, error } = useQuery<ProductsApiResponse>({
    queryKey: ["products", page, priceRange, selectedSort],
    queryFn: () => fetchProducts(page, priceRange, selectedSort),
    placeholderData: keepPreviousData,
  });

  //const totalPages = data?.meta.last_page ?? 1;

  if (isFetching) {
    return <div className="h-9">Data is fetching from the api</div>;
  }

  if (error) {
    return <div className="h-9">Error happened</div>;
  }

  if (data?.data.length === 0) {
    return <div className="h-9">No products</div>;
  }

  return (
    <main className="mb-[216px]">
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
              to="/listing/$productId"
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

      <Pagination
        currentPage={data?.meta.current_page ?? 1}
        lastPage={data?.meta.last_page ?? 1}
        onPageChange={(page) => setPage(page)}
      />
    </main>
  );
}
