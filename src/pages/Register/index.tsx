import { useState } from "react";
import {
  Input,
  Text,
  Container,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { colors } from "../../styles/global";

import { FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  console.log("email: ", email);
  console.log("password: ", password);

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
          onChange={handleMailChange}
        />
      </FormControl>

      <FormControl mt={"10px"}>
        <FormLabel color={`${colors.white}`}>Password</FormLabel>
        <Input
          bg={"white"}
          size="md"
          type="password"
          onChange={handlePasswordChange}
        />
      </FormControl>

      <FormControl mt={"10px"}>
        <FormLabel color={`${colors.white}`}>Confirm password</FormLabel>
        <Input
          bg={"white"}
          size="md"
          type="Confirm"
          onChange={handlePasswordChange}
        />
      </FormControl>

      <Flex align={"end"} mt={"25px"} direction={"column"}>
        <Button colorScheme="teal" size="lg" bg={`${colors.primary}`}>
          Enviar
        </Button>
      </Flex>
    </Container>
  );
};

export default Login;
