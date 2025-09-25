import { Link, useNavigate } from "@tanstack/react-router";
import heroImg from "/hero-img.png";
import { loginSchema, type loginFormData } from "./authSchema";
import { logIn } from "../APIs";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginResponse } from "../types";
import { useAuth } from "../AuthContext";
import { useState } from "react";

export default function Login() {
  const [loginEror, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: loginFormData) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    console.log("form data: ", formData);

    try {
      const response: LoginResponse = await logIn(formData);

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user_profile", JSON.stringify(response.user));
      setAuth(response.user, response.token);
      setLoginError("");
      navigate({ to: "/listing" });

      console.log("respo :", response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("API error:", error.response?.status === 401);
        if (error.response?.status === 401)
          setLoginError("Incorrect mail or password");
      } else {
        console.log("Unexpected error:", error);
        setLoginError("Somthing get wrong, tru again");
      }
    }
  };

  return (
    <main className="grid grid-cols-2 items-center">
      <div>
        <img src={heroImg} alt="loging_hero_img" />
      </div>
      <div className="flex flex-col items-center">
        <p className="w-[554px] poppins-semibold text-[42px] leading-[63px] text-[#10151F] text-start mb-12">
          Log in
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[554px] space-y-6">
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.email ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
            >
              <span className="flex gap-1 mr-2">
                Email <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                {...register("email")}
                className="w-full outline-none border-none bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.password ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
            >
              <span className="flex gap-1 mr-2">
                Password <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                {...register("password")}
                className="w-full outline-none border-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 shrink-0"
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.457 4.254 5.52 7.5 10.066 7.5 2.265 0 4.351-.74 6.023-1.979M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.547 0 8.609 3.246 10.066 7.5a10.523 10.523 0 0 1-4.293 5.225M6.228 6.228 3 3m3.228 3.228 3.65 3.65M12 12l9 9"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {loginEror && <p className="text-left text-[#FF4000]">{loginEror}</p>}
          <div className="w-full pt-[22px]">
            <button className="w-full bg-[#FF4000] text-white text-sm px-8 py-2.5 rounded-lg hover:bg-orange-700 transition cursor-pointer">
              Log in
            </button>
          </div>
        </form>
        <div className="flex items-center gap-2 text-sm  mt-6">
          <p>Not a member?</p>
          <Link
            to={"/registration"}
            className="poppins-medium text-[#FF4000] hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
