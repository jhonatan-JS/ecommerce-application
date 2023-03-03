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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { colors } from "../../styles/global";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface INewProductProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface CreateProductFormData {
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

const NewProduct = ({ isOpen, onClose }: INewProductProps) => {
  const { register, handleSubmit } = useForm<CreateProductFormData>({
    resolver: yupResolver(createProductFormSchema),
  });

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleCreateProduct = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.name);
    formData.append("brand", data.brand);
    formData.append("image", file);
    formData.append("price", data.price);

    setLoading(true);
    try {
      await fetch(`${REACT_APP_API_URL}/product`, {
        method: "POST",
        body: formData,
      });
      onClose();
      window.location.reload();
      setLoading(false);
    } catch (e) {
      toast({
        title: "Oopss..",
        description: "Ocorreu um erro ao cadastrar o produto.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay bg="transparent" />
        <ModalContent
          bg="#02735E"
          shadow="2xl"
          mt={32}
          as="form"
          onSubmit={handleSubmit(
            async (values) => await handleCreateProduct(values)
          )}
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
              {loading ? <Spinner color="white" /> : "Enviar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewProduct;
