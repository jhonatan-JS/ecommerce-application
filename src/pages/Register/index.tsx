import { useState } from "react";
import { Input, Text, Container, Button, Flex } from "@chakra-ui/react";
import { colors } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { api } from "../../services/api";
import { Spinner } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: any) => {
    setConfirmation(e.target.value);
  };

  const handleCreate = async () => {
    if (!email || !password || !confirmation) {
      toast({
        title: "Oopss..",
        description: "Preencha todos os campos.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

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

    if (password.length < 6) {
      toast({
        title: "Oopss..",
        description: "A senha deve ter no mínimo 6 caracteres.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Oopss..",
        description: "Email inválido.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);

      await api.post("/user", {
        email,
        password,
      });

      toast({
        title: "Sucesso",
        description: "Usuário cadastrado com sucesso.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
      setLoading(false);
    } catch (e) {
      toast({
        title: "Oopss..",
        description: "Email já cadastrado.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Container
      textAlign={"center"}
      mt={50}
      bg={`${colors.primary}`}
      borderRadius="md"
      p={12}
    >
      <Text m={"auto"} color={`${colors.white}`} fontSize="4xl">
        Cadastrar
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
          onClick={handleCreate}
          colorScheme="teal"
          size="lg"
          bg={`${colors.primary}`}
        >
          {loading ? <Spinner color="white" /> : "Enviar"}
        </Button>
      </Flex>
    </Container>
  );
};

export default Login;
