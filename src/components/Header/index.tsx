import { useContext, useState } from "react";
import Cart from "../Cart";
import { colors } from "../../styles/global";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AiOutlineLogout } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { api } from "../../services/api";
import { Spinner } from "@chakra-ui/react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Grid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Container,
} from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.pathname;
  const { userId } = useContext(UserContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleMailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: any) => {
    setConfirmation(e.target.value);
  };

  const handeUpdateUser = async () => {
    setLoading(true);
    try {
      if (password !== confirmation) {
        toast({
          title: "Oopss..",
          description: "As senhas não conferem.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      await api.put(`/user/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      });

      onClose();
      toast({
        title: "Alteração concluida",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast({
        title: "Oopss..",
        description: "Erro ao alterar usuario.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const openModal = () => {
    onOpen();
  };

  const deletUser = async () => {
    try {
      const response = await api.delete(`/user/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate("/");
        toast({
          title: "Usuario deletado",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro ao deletar usuario",
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
      <Flex
        as="header"
        w="100%"
        h="20"
        mx="auto"
        px="6"
        align="center"
        bg={`${colors.primary}`}
      >
        <Flex
          maxW={1480}
          w="100%"
          h="100%"
          mx="auto"
          align="center"
          justify="space-between"
        >
          <div style={{ display: "flex" }}>
            {route === "/home" ? (
              <>
                <Menu>
                  <MenuButton
                    bg="#02735E"
                    as={Button}
                    colorScheme={`${colors.primary}`}
                    rightIcon={<ChevronDownIcon />}
                  >
                    User
                  </MenuButton>
                  <MenuList bg="#02735E">
                    <MenuItem bg="#02735E" justifyContent={"space-between"}>
                      <Flex ml={6} cursor="default">
                        <Text fontSize={22}>Edit user</Text>
                      </Flex>
                      <EditIcon
                        cursor={"pointer"}
                        onClick={() => {
                          openModal();
                        }}
                        style={{ marginLeft: 12, marginTop: 4 }}
                        boxSize={8}
                      />
                    </MenuItem>
                    <MenuItem bg="#02735E" justifyContent={"space-between"}>
                      <Flex ml={6} cursor="default">
                        <Text fontSize={22}>Delete user</Text>
                      </Flex>
                      <DeleteIcon
                        cursor={"pointer"}
                        onClick={() => {
                          deletUser();
                        }}
                        style={{ marginLeft: 12, marginTop: 4 }}
                        boxSize={8}
                      />
                    </MenuItem>
                    <MenuItem bg="#02735E" justifyContent={"space-between"}>
                      <Flex ml={6} cursor="default">
                        <Text fontSize={22}>Logout</Text>
                      </Flex>
                      <AiOutlineLogout
                        cursor={"pointer"}
                        onClick={() => {
                          navigate("/");
                        }}
                        style={{ marginLeft: 12, marginTop: 4 }}
                        size={34}
                      />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : null}
          </div>
        </Flex>

        {route === "/home" && <Cart />}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay bg="transparent" />
        <ModalContent bg="#02735E" shadow="2xl" mt={32} as="form">
          <Grid
            alignItems="center"
            justifyItems="space-between"
            templateColumns="2fr 1fr"
            p={2}
          >
            <ModalHeader color="#fff" fontSize="27px" lineHeight="33px" mt={4}>
              <Text color="#fff" fontSize="20px" lineHeight="33px">
                Atualizar usuario
              </Text>
            </ModalHeader>
            <ModalCloseButton
              display="flex"
              color="#fff"
              position="initial"
              justifySelf="flex-end"
            />
          </Grid>

          <Container textAlign={"center"} borderRadius="md" p={12}>
            <FormControl>
              <FormLabel color={`${colors.white}`}>Email</FormLabel>
              <Input
                bg={"white"}
                size="md"
                type="email"
                color={`${colors.black}`}
                onChange={handleMailChange}
              />
            </FormControl>

            <FormControl mt={"10px"}>
              <FormLabel color={`${colors.white}`}>Password</FormLabel>
              <Input
                required
                bg={"white"}
                size="md"
                type="password"
                color={`${colors.black}`}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <FormControl mt={"10px"}>
              <FormLabel color={`${colors.white}`}>Confirm password</FormLabel>
              <Input
                bg={"white"}
                size="md"
                type="password"
                color={`${colors.black}`}
                onChange={handlePasswordConfirmationChange}
              />
            </FormControl>

            <Flex align={"end"} mt={"25px"} direction={"column"}>
              <Button
                onClick={handeUpdateUser}
                colorScheme="teal"
                size="lg"
                bg={`${colors.primary}`}
              >
                {loading ? <Spinner color="white" /> : "Enviar"}
              </Button>
            </Flex>
          </Container>
        </ModalContent>
      </Modal>
    </>
  );
}
