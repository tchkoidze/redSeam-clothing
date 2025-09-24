import { HiOutlineEnvelope } from "react-icons/hi2";
import CartProductCard from "../components/cartProductCard";
import { useAuth } from "../AuthContext";
import { useGetCartProducts } from "../hooks/useCartProducts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type checkoutFormData } from "./checkoutSchema";
import { useMutation } from "@tanstack/react-query";
import { payCart } from "../APIs";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

export default function Order() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema) });

  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { data: cartProducts } = useGetCartProducts(token);

  const payCartProductMutation = useMutation({
    mutationFn: ({ formData }: { formData: any }) => {
      if (!token) throw new Error("User not authenticated");
      return payCart(token, formData);
    },

    onSuccess: () => {
      navigate({ to: "/listing" });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // alert("You are not authorized. Please login.");

          // setTimeout(() => {
          //   navigate({ to: "/login" });
          // }, 1500);
          logout();
        } else {
          console.error("API error:", error.response?.data || error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    },
  });

  const onSubmit = (data: checkoutFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("zip_code", data.zip_code);
    formData.append("address", data.address);

    payCartProductMutation.mutate({ formData });
  };

  return (
    <main className="w-[1920px]">
      <h1 className="text-left">Checkout</h1>
      <form
        onClick={handleSubmit(onSubmit)}
        className="flex gap-[131px] mt-[42px]"
      >
        <div className="w-[1129px] h-[635px] bg-[#F8F6F7] rounded-2xl pt-[72px] pl-[47px]">
          <h3 className="text-left">Order details</h3>

          <div className="w-[578px] flex gap-6 mt-8">
            <div>
              <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600 bg-white">
                <span className="flex gap-1 mr-2">
                  Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full outline-none border-none bg-transparent"
                />
              </div>
              {errors.name && (
                <p className="text-left text-[#FF4000]">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600 bg-white">
                <span className="flex gap-1 mr-2">
                  SurName <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  {...register("surname")}
                  className="w-full outline-none border-none bg-transparent"
                />
              </div>
              {errors.surname && (
                <p className="text-left text-[#FF4000]">
                  {errors.surname.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-[578px] mt-8">
            <div className="flex items-center gap-1 border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600 bg-white">
              <HiOutlineEnvelope size={20} className="shrink-0" />
              <span className="flex gap-1">
                Email <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                {...register("email")}
                className="w-full outline-none border-none bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-left text-[#FF4000]">{errors.email.message}</p>
            )}
          </div>

          <div className="w-[578px] flex gap-6 mt-8">
            <div>
              <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600 bg-white">
                <span className="flex gap-1 mr-2">
                  Address <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  {...register("address")}
                  className="w-full outline-none border-none bg-transparent"
                />
              </div>
              {errors.address && (
                <p className="text-left text-[#FF4000]">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600 bg-white">
                <span className="flex gap-1 mr-2 shrink-0">
                  Zip code <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  {...register("zip_code")}
                  className="w-full outline-none border-none bg-transparent"
                />
              </div>
              {errors.zip_code && (
                <p className="text-left text-[#FF4000]">
                  {errors.zip_code.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order's right part */}
        <div className="w-[460px]">
          <div className="space-y-8 overflow-y-hidden">
            {cartProducts?.map((product) => (
              <CartProductCard product={product} />
            ))}
          </div>
          <div className="text-base space-y-4 my-[81px]">
            <p className="flex justify-between">
              Items subtotal <span>$50</span>
            </p>
            <p className="flex justify-between">
              Delivery <span>$5</span>
            </p>
            <p className="flex justify-between text-xl">
              Total <span>$55</span>
            </p>
          </div>
          <button className="w-full bg-[#FF4000] text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer">
            Pay
          </button>
        </div>
      </form>
    </main>
  );
}
