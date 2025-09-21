import { FiMinus, FiPlus } from "react-icons/fi";

export default function CartProductCard() {
  return (
    <div className="flex items-center gap-4">
      <img
        src=""
        alt="product_img"
        className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-lg"
      />
      <div className="w-full">
        <p className="flex justify-between text-sm">
          <span>Kids' Curved Hilfiger Graphic T-Shirt</span>
          <span>$25</span>
        </p>
        <p className="text-left text-xs mt-2">Baby pink</p>
        <p className="text-left text-xs mt-2">L</p>
        <div className="flex justify-between mt-[13px]">
          <div className="flex items-center gap-[2px] border border-[#E1DFE1] px-2 py-1 rounded-3xl">
            <button>
              <FiMinus />
            </button>
            <span className=" w-[18px] h-[18px] flex justify-center items-center">
              1
            </span>
            <button>
              <FiPlus />
            </button>
          </div>
          <button>remove</button>
        </div>
      </div>
    </div>
  );
}
