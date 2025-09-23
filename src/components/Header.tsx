import { HiMiniUser, HiShoppingCart } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import handEye from "/HandEye.png";
import { useState } from "react";
import type { User } from "../types";
import { useAuth } from "../AuthContext";

export default function Header() {
  // const [user, setUser] = useState<User | null>(() => {
  //   const stored = localStorage.getItem("user");
  //   return stored ? JSON.parse(stored) : null;
  // });

  const { user, token } = useAuth();

  return (
    <header className="flex justify-between py-5">
      <div className="flex items-center gap-1">
        <img src={handEye} alt="hand_eye_logo" />
        <p className="poppins-semibold text-base text-[#10151F]">
          RedSeam Clothing
        </p>
      </div>

      {token ? (
        <div className="flex items-center gap-5">
          <button className="cursor-pointer">
            <HiShoppingCart size={24} />
          </button>

          {/* <p className="w-10 h-10 flex justify-center items-center bg-red-300 text-white text-center text rounded-full my-auto">
          <span> K</span>
        </p> */}
          <button className="flex items-center gap-1 cursor-pointer">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <HiMiniUser size={40} />
            )}

            <RiArrowDownSLine size={20} />
          </button>
        </div>
      ) : (
        <button className="flex items-center gap-2 text-[#10151F]">
          <HiMiniUser size={20} />
          <span className="poppins-medium text-xs">Log in</span>
        </button>
      )}
    </header>
  );
}
