import PaymentModal from "../PaymentModal";
import { colors } from "../../styles/global";
import { useAppSelector } from "../../store/hooks";
import { Flex, Text, Image, useDisclosure } from "@chakra-ui/react";

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { itemsQuantity } = useAppSelector((state) => state.cart);

  return (
    <Flex
      as="button"
      alignItems="center"
      justify="space-around"
      w="90px"
      h="45px"
      p="2"
      bg="green.500"
      borderRadius="8px"
      fontWeight="bold"
      onClick={onOpen}
    >
      <Image src="Cart-Icon.svg" alt="cart" />

      <Text color={`${colors.error}`} fontSize="16px">
        {itemsQuantity}
      </Text>

      <PaymentModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Flex>
  );
};

export default Cart;
