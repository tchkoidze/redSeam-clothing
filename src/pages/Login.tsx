import { Link } from "@tanstack/react-router";
import heroImg from "/hero-img.png";

export default function Login() {
  return (
    <main className="grid grid-cols-2 items-center">
      <div>
        <img src={heroImg} alt="loging_hero_img" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="w-[554px] text-start mb-12">Log in</h1>
        <form action="" className="w-[554px] space-y-6">
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
              <span className="flex gap-1 mr-2">
                Email <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                // {...register("from")}
                className="w-full outline-none border-none bg-transparent"
              />
            </div>
            {/* {errors.from && (
              <p className="text-left text-[#FF4000]">{errors.from.message}</p>
            )} */}
          </div>
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
              <span className="flex gap-1 mr-2">
                Password <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                // {...register("from")}
                className="w-full outline-none border-none bg-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            {/* {errors.from && (
              <p className="text-left text-[#FF4000]">{errors.from.message}</p>
            )} */}
          </div>
          <div className="w-full pt-[22px]">
            <button className="w-full bg-[#FF4000] text-white px-8 py-2 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer">
              Log in
            </button>
          </div>
        </form>
        <div className="flex items-center gap-2 mt-6">
          <p>Not a member?</p>
          <Link to={"/"} className="text-[#FF4000] hover:underline">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
