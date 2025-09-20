import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { PriceRange } from "../types";

const schema = z
  .object({
    from: z
      .string()
      .nonempty("From is required")
      .regex(/^\d+$/, "From must be a number"),
    to: z
      .string()
      .nonempty("To is required")
      .regex(/^\d+$/, "To must be a number"),
  })
  .refine((data) => Number(data.from) < Number(data.to), {
    message: '"From" must be less than "To"',
    path: ["to"],
  });

type PriceFilterInput = z.infer<typeof schema>;

export default function PriceFilter({
  setShowPriceDropdown,
  setPriceRange,
}: {
  setShowPriceDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceFilterInput>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: PriceFilterInput) => {
    setPriceRange({ from: Number(data.from), to: Number(data.to) });
    setShowPriceDropdown(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute -right-5 w-[392px] border border-[#E1DFE1] rounded-lg p-4 bg-white"
    >
      <h3 className="text-left text-lg mb-5">Select price</h3>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
            <span className="flex gap-1 mr-2">
              From <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              {...register("from")}
              className="w-full outline-none border-none bg-transparent"
            />
          </div>
          {errors.from && (
            <p className="text-left text-[#FF4000]">{errors.from.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
            <span className="flex gap-1 mr-2">
              To <span className="text-[#FF4000]">*</span>
            </span>
            <input
              type="text"
              {...register("to")}
              className="w-full outline-none border-none bg-transparent"
            />
          </div>
          {errors.to && (
            <p className="text-left text-[#FF4000]">{errors.to.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-2.5">
        <button className="bg-[#FF4000] text-white px-8 py-2 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer">
          Apply
        </button>
      </div>
    </form>
  );
}
