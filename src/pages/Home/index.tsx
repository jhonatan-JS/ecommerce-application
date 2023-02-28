import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useAppDispatch } from "../../store/hooks";
import { addProductCart } from "../../store/cartSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "../../styles/global";

import Products from "../../components/Products";
import { getProducts } from "../../services/getProducts";
import NewProduct from "../../components/NewProduct";
interface IProductProps {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: number;
  updatedAt: string;
}

const Home = () => {
  const [data, setData] = useState<IProductProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProductsData = async () => {
    const response = await getProducts();
    setData(response);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    getProductsData();
  }, []);

  const handleAddToCart = (product: IProductProps) => {
    try {
      dispatch(addProductCart(product));

      if (toast.isActive("productAdded")) {
        toast.update("productAdded", {
          render: `Produto adicionado ao carrinho`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
      } else {
        toast.success(`Produto adicionado ao carrinho`, {
          toastId: "productAdded",
        });
      }
    } catch (error) {
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  };

  return (
    <Flex w="100%" my="6" maxWidth={1200} mx="auto" px="6">
      <Box flex="1" borderRadius={8} overflow="auto">
        <ToastContainer position="bottom-center" />
        <Grid
          templateColumns={"repeat(auto-fill, minmax(218px, 1fr))"}
          gap={6}
          mx="auto"
          justifyContent="center"
          mb={7}
        >
          {data ? (
            data.map((product) => (
              <Products
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="#fff"
              color="blue.500"
            />
          )}
        </Grid>
        <Flex h={"80vh"}>
          <Button
            size="lg"
            ml={"auto"}
            bg={`${colors.primary}`}
            colorScheme="teal"
            onClick={onOpen}
          >
            New Product
          </Button>
        </Flex>
      </Box>
      <NewProduct isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Flex>
  );
};
export default Home;
