import Cart from "../Cart";
import { Flex } from "@chakra-ui/react";
import { colors } from "../../styles/global";
import { Avatar } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const route = location.pathname;

  console.log("route", route);

  return (
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
        <Avatar src="https://bit.ly/broken-link" />
      </Flex>

      {route === "/home" && <Cart />}
    </Flex>
  );
}
