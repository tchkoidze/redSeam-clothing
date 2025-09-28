import { FiMinus, FiPlus } from "react-icons/fi";
import type { CartProduct } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartProduct, updateCartProduct } from "../APIs";
import { useAuth } from "../AuthContext";
import { toTitleCase } from "../utils/format";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: ({
      productId,
      productFeature,
    }: {
      productId: number;
      productFeature: { color: string; size: string };
    }) => {
      if (!token) throw new Error("User not authenticated");
      return deleteCartProduct(token, productId, productFeature);
    },
    onSuccess: () => {
      // refetch cart after deletion
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      if (!token) throw new Error("User not authenticated");
      return updateCartProduct(token, productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateProductMutation.mutate({
        productId: product.id,
        quantity: product.quantity - 1,
      });
    }
  };

  const handleIncrease = () => {
    updateProductMutation.mutate({
      productId: product.id,
      quantity: product.quantity + 1,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={product.cover_image}
        alt="product_img"
        className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-lg"
      />
      <div className="w-full">
        <p className="flex justify-between poppins-medium text-sm">
          <span>{toTitleCase(product.name)}</span>
          <span className="text-lg">${product.price}</span>
        </p>
        <p className="text-left text-xs capitalize mt-2">{product.color}</p>
        <p className="text-left text-xs mt-2">{product.size}</p>
        <div className="flex justify-between mt-[13px]">
          <div className="flex items-center gap-[2px] border border-[#E1DFE1] px-2 py-1 rounded-3xl">
            <button
              type="button"
              className={`${product.quantity === 1 ? "text-[#E1DFE1]" : "text-[#3E424A]"} cursor-pointer`}
              onClick={handleDecrease}
            >
              <FiMinus />
            </button>
            <span className=" w-[18px] h-[18px] flex justify-center items-center">
              {product.quantity}
            </span>
            <button
              type="button"
              className="text-[#3E424A] cursor-pointer"
              onClick={handleIncrease}
            >
              <FiPlus />
            </button>
          </div>
          <button
            type="button"
            className="text-[#3E424A] text-xs cursor-pointer"
            onClick={() =>
              deleteProductMutation.mutate({
                productId: product.id,
                productFeature: { color: product.color, size: product.size },
              })
            }
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
