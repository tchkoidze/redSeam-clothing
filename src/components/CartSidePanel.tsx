import CartProductCard from "./cartProductCard";
import { IoMdClose } from "react-icons/io";
import Purchase from "/purchase.png";

export default function CartSidePanel({
  close,
}: {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 bg-[#10151F]/30 w-full h-screen">
      <div className="w-[540px] bg-white p-10 ml-auto h-screen">
        <div className="flex justify-between items-center poppins-medium text-[#10151F]">
          <p>Shopping cart (2)</p>
          <button onClick={() => close(false)}>
            <IoMdClose
              size={32}
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </button>
        </div>
        {/* <div className="h-[90%] flex flex-col justify-between mt-[63px]">
          <div>
            <CartProductCard />
          </div>

          <div className="text-base space-y-4 mt-[81px]">
            <p className="flex justify-between">
              Items subtotal <span>$50</span>
            </p>
            <p className="flex justify-between">
              Delivery <span>$5</span>
            </p>
            <p className="flex justify-between text-xl">
              Total <span>$55</span>
            </p>
            <button className="w-full bg-[#FF4000] text-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer mt-[81px]">
              Go to checkout
            </button>
          </div>
        </div> */}
        <div className="grid grid-cols-1 justify-items-center mt-[151px]">
          <img src={Purchase} alt="purchase" />
          <h3 className="poppins-semibold text-2xl leading-[36px] text-[#10151F]">
            Ooops!
          </h3>
          <p className="text-sm text-[#3E424A] mt-6 mb-2.5">
            You've got nothing in your cart just yet...
          </p>
          <button className="w-[214px] bg-[#FF4000] text-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer mt-[81px]">
            Start shopping
          </button>
        </div>
      </div>
    </div>
  );
}
