import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

interface ISelectedProductProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
  };
  handleDeleProduct: (product: any) => void;
  handleIncrement: (product: any) => void;
  handleDrecrement: (product: any) => void;
}

const SelectedProduct = ({
  product,
  handleDeleProduct,
  handleIncrement,
  handleDrecrement,
}: ISelectedProductProps) => {
  return (
    <Flex
      key={product._id}
      bg="#fff"
      p={4}
      borderRadius="8px"
      gap={6}
      mt={4}
      position="relative"
      direction={["column", "column", "row"]}
    >
      <Icon
        as={AiOutlineClose}
        w={6}
        h={6}
        p={1}
        position="absolute"
        right="-5px"
        top="-5px"
        cursor="pointer"
        onClick={() => handleDeleProduct(product)}
        borderRadius="50%"
        bg="black"
        color="#fff"
      >
        X
      </Icon>

      <Flex align="center" gap={2} direction={["column"]}>
        <Image src={product.image} w={["80px", "100px"]} alt={product.name} />
        <Text
          color="black"
          fontSize={["16px", "13px"]}
          fontWeight="400"
          w={["100%", "100px"]}
          textAlign={["center", "left"]}
        >
          {product.name}
        </Text>
      </Flex>

      <Flex align="center" justify="space-evenly" gap={4}>
        <Flex
          direction="column"
          align="center"
          justify="space-evenly"
          position="relative"
          gap={2}
        >
          <Text
            color="black"
            fontSize="6px"
            position="absolute"
            top="-10px"
            left="1px"
          >
            Qtd:
          </Text>
          <Flex
            align="center"
            border="1px solid #BFBFBF"
            borderRadius="8px"
            gap={2}
          >
            <Button
              bg="red.300"
              onClick={() => handleDrecrement(product)}
              borderRight="1px solid #BFBFBF"
            >
              -
            </Button>
            <Text color="black" w="15px" textAlign="center">
              {product.quantity}
            </Text>
            <Button
              bg="green.300"
              onClick={() => handleIncrement(product)}
              borderLeft="1px solid #BFBFBF"
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Flex>
          <Text color="black" fontWeight="bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price * product.quantity)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SelectedProduct;
