import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Toast, useDisclosure, useToast } from "@chakra-ui/react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Card,
  Flex,
  Image,
  Img,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services/api";
import { colors } from "../../styles/global";

import { useState } from "react";
interface IProductCardProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    description: string;
    image: string;
    price: number;
  };
  handleAddToCart: (product: any) => void;
}

interface CreateProductFormData {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: string;
  image: string;
}

const createProductFormSchema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  description: yup.string().required("Informe a descrição"),
  brand: yup.string().required("Informe a marca"),
  price: yup.string().required("Informe o preço"),
  image: yup.string().notRequired(),
});

const ProductCard = ({ product, handleAddToCart }: IProductCardProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idProduct, setIdProduct] = useState<any>(null);

  const { register, handleSubmit } = useForm<CreateProductFormData>({
    resolver: yupResolver(createProductFormSchema),
  });

  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const openModal = (id: any) => {
    setIdProduct(id);
  };

  const editProduct = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.name);
    formData.append("brand", data.brand);
    formData.append("image", file);
    formData.append("price", data.price);

    try {
      await api.put(`/product/${idProduct}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: formData.get("name"),
          description: formData.get("description"),
          brand: formData.get("brand"),
          image: file,
          price: formData.get("price"),
        },
      });

      onClose();
      Toast({
        title: "Produto editado com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      const response = await api.delete(`/product/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        toast({
          title: "Erro ao deletar produto",
          description: "Tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card key={product._id} color="black" textAlign="left">
        <DeleteIcon
          onClick={() => {
            deleteProduct(product._id);
          }}
          cursor={"pointer"}
          margin={2}
          boxSize={6}
          color="red.500"
        />

        <EditIcon
          onClick={() => {
            onOpen();
            openModal(product._id);
          }}
          cursor={"pointer"}
          margin={2}
          boxSize={6}
          color="green.500"
        />

        <Flex
          bg="#fff"
          p="4"
          borderRadius={8}
          pb="0"
          direction="column"
          alignItems="center"
        >
          <Img
            src={product.image}
            alt={product.name}
            h="138px"
            objectFit="cover"
          />

          <Flex
            direction="column"
            mt="4"
            mb="4"
            align="center"
            justify="space-between"
            width="100%"
            gap="4"
          >
            <Flex align="center" justify="space-between" width="100%" gap={2}>
              <Text
                fontSize="16px"
                mt="1"
                fontWeight="600"
                lineHeight="19px"
                color="#2C2C2C"
              >
                {product.name}
              </Text>

              <Text
                fontSize="15px"
                fontWeight="700"
                lineHeight="15px"
                mt="1"
                bg="#373737"
                color="#fff"
                p="2"
                borderRadius="md"
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </Text>
            </Flex>

            <Text
              fontSize="13px"
              lineHeight="12px"
              textAlign="left"
              fontWeight="300"
            >
              {product.description}
            </Text>
          </Flex>
        </Flex>

        <Button
          colorScheme="green"
          size="sm"
          mt="auto"
          width="100%"
          onClick={() => handleAddToCart(product)}
          display="flex"
          alignItems="center"
        >
          <Image src="shopping-bag.svg" alt="Carrinho" width="15px" mr="14px" />
          <Text>Adicionar ao carrinho</Text>
        </Button>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay bg="transparent" />
        <ModalContent
          bg="#02735E"
          shadow="2xl"
          mt={32}
          as="form"
          onSubmit={handleSubmit(async (values) => await editProduct(values))}
        >
          <Grid
            alignItems="center"
            justifyItems="space-between"
            templateColumns="2fr 1fr"
            p={2}
          >
            <ModalHeader color="#fff" fontSize="27px" lineHeight="33px" mt={4}>
              <Text color="#fff" fontSize="20px" lineHeight="33px">
                Cadastrar um produto
              </Text>
            </ModalHeader>
            <ModalCloseButton
              display="flex"
              color="#fff"
              position="initial"
              justifySelf="flex-end"
            />
          </Grid>

          <ModalBody display="flex" flexDirection="column" alignItems="start">
            <FormControl id="name" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Name</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
                {...register("name")}
              />
            </FormControl>

            <FormControl id="description" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Description</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
                {...register("description")}
              />
            </FormControl>

            <FormControl id="brand" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Brand</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
                {...register("brand")}
              />
            </FormControl>

            <FormControl id="value" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>value</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="number"
                {...register("price")}
              />
            </FormControl>

            <FormControl w={"auto"} id="img" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Carregar imagem</FormLabel>
              <input type="file" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter flexDirection="column">
            <Button
              type="submit"
              bg="black"
              color="#fff"
              w="50%"
              h="30px"
              fontSize="20px"
              _hover={{
                bg: "gray.300",
                color: "black",
              }}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
