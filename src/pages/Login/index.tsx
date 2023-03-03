import { useState, useContext } from "react";
import { Input, Text, Container, Button, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { colors } from "../../styles/global";
import { api } from "../../services/api";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { UserContext } from "../../contexts/user";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(UserContext);
  const handleMailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/user/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      });
      navigate("/home");
      setUserId(response.data._id);
    } catch (e) {
      toast({
        title: "Oopss..",
        description: "Email ou senha invalidos.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Container
        textAlign={"center"}
        mt={50}
        bg={`${colors.primary}`}
        borderRadius="md"
        p={12}
      >
        <Text m={"auto"} color={`${colors.white}`} fontSize="4xl">
          Bem vindo!
        </Text>

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
            bg={"white"}
            size="md"
            type="password"
            color={`${colors.black}`}
            onChange={handlePasswordChange}
          />
        </FormControl>

        <Flex align={"end"} mt={"25px"} direction={"column"}>
          <Button
            onClick={handleLogin}
            colorScheme="teal"
            size="lg"
            bg={`${colors.primary}`}
          >
            Enviar
          </Button>

          <Text mt={6}>
            Primeiro acesso? {""}
            <Link color="teal.500" href="/Register">
              Click aqui.
            </Link>
          </Text>
        </Flex>
      </Container>
    </>
  );
};

export default Login;
