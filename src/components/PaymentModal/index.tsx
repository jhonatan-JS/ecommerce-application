import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearCart,
  decrementProductCart,
  deleteProductCart,
  incrementProductCart,
} from "../../store/cartSlice";

import { toast } from "react-toastify";
import SelectedProduct from "../SelectedProduct";

interface IPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface IProductProps {
  _id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

const PaymentModal = ({ isOpen, onClose }: IPaymentModalProps) => {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleIncrement = (product: IProductProps) => {
    dispatch(incrementProductCart(product));
  };

  const handleDrecrement = (product: IProductProps) => {
    dispatch(decrementProductCart(product));
  };

  const handleDeleProduct = (product: IProductProps) => {
    dispatch(deleteProductCart(product));
  };

  const handleClearCart = () => {
    if (cart.length > 0) {
      dispatch(clearCart());
      toast.success("Carrinho limpo");
    } else {
      toast.error("Carrinho vazio");
    }
  };

  const handleFinishCart = () => {
    if (cart.length > 0) {
      dispatch(clearCart());
      toast.success("Compra finalizada");
    } else {
      toast.error("Carrinho vazio");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay bg="transparent" />
        <ModalContent bg="#02735E" shadow="2xl" mt={32}>
          <Grid
            alignItems="center"
            justifyItems="space-between"
            templateColumns="2fr 1fr"
            p={2}
          >
            <ModalHeader color="#fff" fontSize="27px" lineHeight="33px" mt={4}>
              Carrinho
              <Text color="#fff" fontSize="27px" lineHeight="33px">
                de Compras
              </Text>
            </ModalHeader>
            <ModalCloseButton
              display="flex"
              color="#fff"
              position="initial"
              justifySelf="flex-end"
            />
          </Grid>

          <ModalBody display="flex" flexDirection="column" alignItems="center">
            {cart.map((product: IProductProps) => (
              <SelectedProduct
                key={product._id}
                product={product}
                handleIncrement={handleIncrement}
                handleDrecrement={handleDrecrement}
                handleDeleProduct={handleDeleProduct}
              />
            ))}
          </ModalBody>

          <ModalFooter flexDirection="column">
            <Button colorScheme="red" onClick={handleClearCart}>
              Limpar Carrinho
            </Button>
            <Flex align="center" justify="space-between" w="100%" p={4}>
              <Text fontWeight="bold" color="#fff" fontSize={["20px", "28px"]}>
                Total:
              </Text>
              <Text fontWeight="bold" color="#fff" fontSize={["20px", "28px"]}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalPrice)}
              </Text>
            </Flex>
            <Button
              bg="black"
              color="#fff"
              w="100%"
              h="50px"
              fontSize="20px"
              _hover={{
                bg: "gray.300",
                color: "black",
              }}
              onClick={handleFinishCart}
            >
              Finalizar Compra
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
