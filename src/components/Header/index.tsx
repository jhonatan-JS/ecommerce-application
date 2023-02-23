import Cart from "../Cart";
import { Flex } from "@chakra-ui/react";
import { colors } from "../../styles/global";

export default function Header() {
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
        <div></div>
        <Cart />
      </Flex>
    </Flex>
  );
}
