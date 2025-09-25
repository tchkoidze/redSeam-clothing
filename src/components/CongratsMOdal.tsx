import { useNavigate } from "@tanstack/react-router";
import Check from "/check.svg";
import { IoMdClose } from "react-icons/io";

export default function Congrats({
  setShowCongratsModal,
}: {
  setShowCongratsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center bg-[#10151F]/30">
      <div className="w-[876px] h-[590px] flex flex-col items-center bg-white p-[30px]">
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              (setShowCongratsModal(false), navigate({ to: "/listing" }));
            }}
          >
            <IoMdClose size={40} />
          </button>
        </div>
        <div className="mt-[44px] mb-10">
          <img src={Check} alt="check_mark" />
        </div>
        <p className="poppins-semibold text-[42px] text-[#10151F]">Congrats!</p>
        <p className="text-sm text-[#3E424A] mt-4 mb-[74px]">
          Your order is placed successfully!
        </p>

        <button
          onClick={() => {
            (setShowCongratsModal(false), navigate({ to: "/listing" }));
          }}
          className="w-[214px] bg-[#FF4000] text-white text-sm px-10 py-2.5 rounded-lg hover:bg-orange-700 transition cursor-pointer"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}
