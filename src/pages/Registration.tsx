import { Link, useNavigate } from "@tanstack/react-router";
import heroImg from "/hero-img.png";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormData } from "./authSchema";
import { registration } from "../APIs";
import axios from "axios";
import type { RegistrationErrorResponse } from "../types";
import { useFileUpload } from "../hooks/useImageUpload";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [registerErrored, setRegisterErrored] =
    useState<RegistrationErrorResponse | null>(null);

  const {
    image,
    error: imageError,
    handleFileChange,
    setImage,
    dataURLtoFile,
  } = useFileUpload();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationFormData) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("username", data.userName);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);

    if (image) {
      const file = dataURLtoFile(image, "avatar_image");
      formData.append("avatar", file);
    }

    console.log("form data: ", formData);

    try {
      const res = await registration(formData);
      setImage("");
      navigate({ to: "/login" });
      console.log("respo :", res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("API error:", error.response?.data);
        setRegisterErrored(error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <main className="grid grid-cols-[948px_1fr] items-center">
      <div>
        <img src={heroImg} alt="loging_hero_img" />
      </div>
      <div className="flex flex-col ml-[173px]">
        <p className="w-[554px] poppins-semibold text-[42px] leading-[63px] text-[#10151F] text-start mb-12">
          Registration
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[554px] text-sm space-y-6"
        >
          <div>
            <input
              type="file"
              id="myphoto"
              accept="image/*"
              onChange={handleFileChange}
              //accept=".jpg,.jpeg,.png"
              //{...register("avatar")}
              // onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            {image ? (
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt="uploaded_avatar"
                  className="w-[100px] h-[100px] rounded-full"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload new
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImage("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-[100px] h-[100px] flex justify-center items-center border border-[#E1DFE1] rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    Upload image
                  </button>
                </div>
                {imageError && (
                  <p className="text-[10px] text-[#FF4000]">{imageError}</p>
                )}
              </div>
            )}
          </div>
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.userName || registerErrored?.errors.username ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
            >
              <span className="flex gap-1 mr-2">
                Username <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                {...register("userName")}
                className="w-full outline-none border-none bg-transparent"
              />
            </div>
            {errors.userName && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {errors.userName.message}
              </p>
            )}
            {registerErrored?.errors.username && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {registerErrored?.errors.username}
              </p>
            )}
          </div>
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.email || registerErrored?.errors.email ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
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
            {registerErrored?.errors.email && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {registerErrored?.errors.email}
              </p>
            )}
          </div>
          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.password || registerErrored?.errors.password ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
            >
              <span className="flex gap-1 mr-2">
                Password <span className="text-red-500">*</span>
              </span>
              <input
                type={showPassword ? "text" : "password"}
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

          <div>
            <div
              className={`flex items-center border rounded-lg px-3 py-2.5 ${errors.password ? "border-[#FF4000]" : "border-[#E1DFE1]"} text-gray-600`}
            >
              <span className="flex gap-1 mr-2 shrink-0">
                Confirm password <span className="text-red-500">*</span>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full outline-none border-none bg-transparent"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="ml-2 cursor-pointer"
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <p className="text-[10px] text-left text-[#FF4000] mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="w-full pt-[22px]">
            <button className="w-full bg-[#FF4000] text-sm text-white px-8 py-2 rounded-lg hover:bg-orange-700 transition cursor-pointer">
              Register
            </button>
          </div>
        </form>
        <div className="flex items-center text-sm gap-2 mt-6">
          <p>Already member?</p>
          <Link
            to={"/login"}
            className="poppins-medium text-[#FF4000] hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
