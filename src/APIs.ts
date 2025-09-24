import axios from "axios";
import type { AddtoCartProduct, PriceRange } from "./types";

export const fetchProducts = async (
  page = 1,
  priceRange: PriceRange,
  sort: string | undefined
) => {
  try {
    const response = await axios.get(
      `https://api.redseam.redberryinternship.ge/api/products`, //?page=${page}&filter[price_from]=100&filter[price_to]=500&sort=price
      {
        params: {
          page,
          ...(priceRange?.from !== null
            ? { "filter[price_from]": priceRange.from }
            : {}),
          ...(priceRange?.to !== null
            ? { "filter[price_to]": priceRange.to }
            : {}),
          ...(sort ? { sort } : {}),
        },
      }
    );
    console.log(page, priceRange, sort);
    console.log("prod: ", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchProduct = async (id = 2) => {
  try {
    const response = await axios.get(
      `https://api.redseam.redberryinternship.ge/api/products/${id}`
    );
    console.log("prodact: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const registration = async (formData: any) => {
  try {
    const response = await axios.post(
      `https://api.redseam.redberryinternship.ge/api/register`,
      formData
      // {
      //   headers: {
      //     Authorization: `Bearer ${apiToken}`,
      //   },
      // }
    );
    console.log("prodact: ", response);
    return response;
  } catch (error) {
    //console.error("Error registering:", error);
    throw error;
  }
};

export const logIn = async (formData: any) => {
  const response = await axios.post(
    `https://api.redseam.redberryinternship.ge/api/login`,
    formData
  );
  console.log("prodact: ", response.data);
  return response.data;
};

export const fetchCartProducts = async (apiToken: string) => {
  try {
    const response = await axios.get(
      `https://api.redseam.redberryinternship.ge/api/cart`,

      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log("prodact: ", response);
    return response.data;
  } catch (error) {
    //console.error("Error registering:", error);
    throw error;
  }
};

export const deleteCartProduct = async (
  apiToken: string,
  ProductId: number
) => {
  try {
    const response = await axios.delete(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${ProductId}`,

      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log("prodact: ", response);
    return response.data;
  } catch (error) {
    //console.error("Error registering:", error);
    throw error;
  }
};

export const updateCartProduct = async (
  apiToken: string,
  ProductId: number,
  quantity: number
) => {
  try {
    const response = await axios.patch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${ProductId}`,

      {
        quantity,
      },

      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log("prodact: ", response);
    return response.data;
  } catch (error) {
    //console.error("Error registering:", error);
    throw error;
  }
};

export const addtoCartProduct = async (
  apiToken: string,
  ProductId: number,
  product: AddtoCartProduct
) => {
  try {
    const response = await axios.post(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${ProductId}`,

      product,

      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    console.log("add prodact: ", response);
    return response.data;
  } catch (error) {
    //console.error("Error registering:", error);
    throw error;
  }
};
