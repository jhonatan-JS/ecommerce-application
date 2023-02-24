import { api } from "./api";

const getProducts = async () => {
  const response = await api.get("/product");
  return response.data;
};

export { getProducts };
