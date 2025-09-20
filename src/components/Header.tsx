import { HiMiniUser, HiShoppingCart } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import handEye from "/HandEye.png";

export default function Header() {
  return (
    <header className="flex justify-between px-[100px] py-5">
      <div className="flex items-center gap-1">
        <img src={handEye} alt="hand_eye_logo" />
        <p>RedSeam Clothing</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="cursor-pointer">
          <HiShoppingCart size={24} />
        </button>

        {/* <p className="w-10 h-10 flex justify-center items-center bg-red-300 text-white text-center text rounded-full my-auto">
          <span> K</span>
        </p> */}
        <button className="flex items-center gap-1 cursor-pointer">
          <HiMiniUser size={40} />
          <RiArrowDownSLine size={20} />
        </button>
      </div>
    </header>
  );
}
