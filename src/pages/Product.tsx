import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { fetchProduct } from "../APIs";
import { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useParams } from "@tanstack/react-router";
import { toTitleCase } from "../utils/format";

const colorClassMap: Record<string, string> = {
  Red: "bg-red-700",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Khaki: "bg-green-700",
  Black: "bg-black",
  White: "bg-white border border-gray-300",
  Pink: "bg-pink-500",
  Yellow: "bg-yellow-400",
  Purple: "bg-purple-500",
  Grey: "bg-gray-500",
  "Grey Melange": "bg-gray-300",
  Brown: "bg-amber-900",
  Maroon: "bg-red-900",
  Mauve: "bg-purple-300",
  "Navy Blue": "bg-blue-900",
  Peach: "bg-orange-300",
  "Off White": "bg-neutral-100 border border-gray-300",
  Orange: "bg-orange-500",
  Magenta: "bg-fuchsia-600",
  Cream: "bg-yellow-100",
  Beige: "bg-amber-100",
  Olive: "bg-lime-800",
  Multi: "bg-gradient-to-r from-pink-500 via-yellow-300 to-green-500",
};

export function Product() {
  //const [quantity, setQuantity] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>();
  const [selections, setSelections] = useState({
    quantity: 1,
    size: "L",
  });
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);

  const { productId } = useParams({ from: "/product/$productId" });
  console.log("param", productId);

  const { data } = useQuery<Product>({
    // queryKey: ["products", page, priceFrom, priceTo, sort],
    queryKey: ["product"],
    queryFn: () => fetchProduct(productId), //{ page, priceFrom, priceTo, sort }
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    //setQuantity(data?.quantity);
    if (data?.available_colors && data.available_colors.length > 0) {
      setSelectedColor(data.available_colors[0]);
    }
    if (data?.images && data.images.length > 0) setSelectedImg(data.images[0]);
  }, [data]);
  return (
    <main className="w-fit">
      <p className="poppins-light text-sm text-left mb-[49px]">
        listing / product
      </p>
      <div className="flex gap-[168px]">
        <div className="w-[848px] flex gap-6">
          <div className="w-[121px] space-y-2.5 shrink-0">
            {data?.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`w-[121px] h-[161px] border rounded-lg cursor-pointer ${
                  img === selectedImg ? "border-[#FF4000]" : "border-[#E1DFE1]"
                }`}
                onClick={() => {
                  setSelectedImg(img);
                  // select the corresponding color
                  if (data?.available_colors && data.available_colors[index]) {
                    setSelectedColor(data.available_colors[index]);
                  }
                }}
              />
            ))}
          </div>
          <img
            src={selectedImg}
            alt="product_cover-image"
            className="w-[703px] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-none w-[704px] space-y-14">
          <div className="poppins-semibold text-[32px]  text-left">
            <h3 className="mb-[21px]">{toTitleCase(data?.name || "")}</h3>
            <p>${data?.price}</p>
          </div>

          <div className="space-y-12">
            <div>
              <p className="text-left mb-4">Color: {selectedColor}</p>
              <div className="flex flex-nowrap gap-[18px]">
                {data?.available_colors?.map((color, index) => (
                  <div
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImg(data.images[index]);
                    }}
                    className={`w-[38px] h-[38px] shrink-0 rounded-full cursor-pointer ${
                      colorClassMap[color]
                    } ${
                      selectedColor === color
                        ? "outline outline-[#E1DFE1] outline-offset-4  "
                        : "outline-none"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-left mb-4">Size: {selections.size} </p>
              <div className="flex gap-2">
                {data?.available_sizes?.map((size) => (
                  <div
                    key={size}
                    onClick={() => setSelections((prev) => ({ ...prev, size }))}
                    className={`w-[70px] border py-[9px] rounded-lg cursor-pointer ${
                      size === selections.size
                        ? "border-[#10151F]"
                        : "border-[#E1DFE1]"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-left mb-4">Quantity</p>
              <div className="relative">
                <button
                  onClick={() => setShowQuantityDropdown((prev) => !prev)}
                  className="flex items-center gap-2.5 px-3.5 py-2 border border-[#E1DFE1] rounded-lg"
                >
                  <span>{selections.quantity}</span>
                  <RiArrowDownSLine size={20} />
                </button>

                {showQuantityDropdown && (
                  <div className="absolute mt-2 w-[68px] bg-white border border-[#E1DFE1] rounded-lg shadow-lg z-10">
                    {[...Array(10)].map((_, i) => {
                      const qty = i + 1;
                      return (
                        <div
                          key={qty}
                          onClick={() => {
                            setSelections((prev) => ({
                              ...prev,
                              quantity: qty,
                            }));
                            setShowQuantityDropdown(false);
                          }}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                            qty === selections.quantity ? "bg-gray-200" : ""
                          }`}
                        >
                          {qty}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2.5 poppins-medium text-lg leading-[27px] text-white bg-[#FF4000] py-4 rounded-lg">
            <HiOutlineShoppingCart /> Add to cart
          </button>
          <div className="w-full h-[1px] bg-[#E1DFE1]"></div>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="poppins-medium text-xl text-[#10151F]">Details</h3>{" "}
              <img
                src={data?.brand.image}
                alt={data?.brand.name}
                className="h-[61px]"
              />
            </div>
            <h4 className="text-left">Brand: {data?.brand.name}</h4>
            <p className="text-left">{data?.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
