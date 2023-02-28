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

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { DropContainer } from "./styles";
import { api } from "../../services/api";
import { colors } from "../../styles/global";

import Dropzone from "react-dropzone";
import { useState, useCallback } from "react";

interface INewProductProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const NewProduct = ({ isOpen, onClose }: INewProductProps) => {
  const renderDragMessage = (isDragActive: any, isDragReject: any) => {
    if (!isDragActive) {
      return <p>Drop your file here</p>;
    }
    if (isDragReject) {
      return <p>File not accepted, sorry</p>;
    }
    return <p>Drop the file here</p>;
  };

  const handleUpload = useCallback(async (file: any) => {
    const fileData = file[0];

    let formData = new FormData();
    formData.append("name", "mouse");
    formData.append("description", "Criados pela Apple Ligam e se conectam");
    formData.append("brand", "Apple");
    formData.append("image", fileData);
    formData.append("price", "123");

    const payload = {
      name: "mouse",
      description: "Criados pela Apple Ligam e se conectam",
      brand: "Apple",
      image: fileData,
      price: "123",
    };

    const response = await api.post("/product", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  }, []);

  const handleCreate = useCallback((event: any) => {
    const { id, value } = event.target;

    console.log(id, value);
  }, []);

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

          <ModalBody
            onChange={handleCreate}
            display="flex"
            flexDirection="column"
            alignItems="start"
          >
            <FormControl id="name" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Name</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
              />
            </FormControl>

            <FormControl id="description" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Description</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
              />
            </FormControl>

            <FormControl id="brand" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Brand</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="text"
              />
            </FormControl>

            <FormControl id="value" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>value</FormLabel>
              <Input
                bg={"white"}
                size="md"
                textColor={`${colors.black}`}
                type="number"
              />
            </FormControl>

            <FormControl w={"auto"} id="img" mt={"10px"} isRequired>
              <FormLabel color={`${colors.white}`}>Carregar imagem</FormLabel>
              <Dropzone onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}>
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                }) => (
                  <section>
                    <DropContainer
                      {...getRootProps()}
                      isDragActive={isDragActive}
                      isDragReject={isDragReject}
                    >
                      <input {...getInputProps()} />
                      {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                  </section>
                )}
              </Dropzone>
            </FormControl>
          </ModalBody>

          <ModalFooter flexDirection="column">
            <Button
              bg="black"
              color="#fff"
              w="50%"
              h="30px"
              fontSize="20px"
              _hover={{
                bg: "gray.300",
                color: "black",
              }}
              onClick={handleCreate}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewProduct;
