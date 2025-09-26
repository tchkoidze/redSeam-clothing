import { HiMiniUser, HiShoppingCart } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import handEye from "/HandEye.png";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";

export default function Header({
  close,
}: {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [user, setUser] = useState<User | null>(() => {
  //   const stored = localStorage.getItem("user");
  //   return stored ? JSON.parse(stored) : null;
  // });

  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleOpenCart = () => {
    if (!token) {
      alert("You need to log in first!");
      return;
    }
    close(true);
  };

  return (
    <header className="h-20 flex justify-between items-center px-[100px] py-5">
      <Link to="/listing" className="flex items-center gap-1">
        <img src={handEye} alt="hand_eye_logo" />
        <p className="poppins-semibold text-base text-[#10151F]">
          RedSeam Clothing
        </p>
      </Link>

      {token ? (
        <div className="flex items-center gap-5">
          <button onClick={handleOpenCart} className="cursor-pointer">
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
        <button
          onClick={() => {
            navigate({ to: "/login" });
          }}
          className="flex items-center gap-2 text-[#10151F] cursor-pointer"
        >
          <HiMiniUser size={20} />
          <span className="poppins-medium text-xs">Log in</span>
        </button>
      )}
    </header>
  );
}
