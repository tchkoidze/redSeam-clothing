import axios from "axios";

export const fetchProducts = async (page = 1, sort: string | undefined) => {
  try {
    const response = await axios.get(
      `https://api.redseam.redberryinternship.ge/api/products?page=${page}&filter[price_from]=100&filter[price_to]=500&sort=price`,
      {
        params: {
          //page,
          "filter[price_from]": 100,
          "filter[price_to]": 500,
          ...(sort ? { sort } : {}),
        },
      }
    );
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
