import { FiMinus, FiPlus } from "react-icons/fi";
import type { CartProduct } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartProduct } from "../APIs";
import { useAuth } from "../AuthContext";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const { token } = useAuth(); // get token from your auth context
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!token) throw new Error("User not authenticated");
      return deleteCartProduct(token, productId);
    },
    onSuccess: () => {
      // refetch cart after deletion
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });
  return (
    <div key={product.id} className="flex items-center gap-4">
      <img
        src={product.cover_image}
        alt="product_img"
        className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-lg"
      />
      <div className="w-full">
        <p className="flex justify-between poppins-medium text-sm">
          <span>{product.name}</span>
          <span className="text-lg">${product.price}</span>
        </p>
        <p className="text-left text-xs mt-2">{product.color}</p>
        <p className="text-left text-xs mt-2">{product.size}</p>
        <div className="flex justify-between mt-[13px]">
          <div className="flex items-center gap-[2px] border border-[#E1DFE1] px-2 py-1 rounded-3xl">
            <button>
              <FiMinus />
            </button>
            <span className=" w-[18px] h-[18px] flex justify-center items-center">
              {product.quantity}
            </span>
            <button>
              <FiPlus />
            </button>
          </div>
          <button
            className="text-[#3E424A] text-xs cursor-pointer"
            onClick={() => deleteProductMutation.mutate(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
