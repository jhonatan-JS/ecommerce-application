import { api } from "./api";

const getProducts = async () => {
  const response = await api.get("/product");
  console.log(response.data);
  return response.data;
};

export { getProducts };
