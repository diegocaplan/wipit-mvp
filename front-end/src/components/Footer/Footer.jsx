import { Flex, Text } from "@chakra-ui/react"; // Box, Center, Button, Text
import React from "react";

export const Footer = () => {
  return (
    <Flex bg='white' justify="center" p={5} mt='5%'  w="100%" borderTop="2px" borderColor="gray.200">
      <Text fontWeight="semibold" fontSize="xs" color="gray.400">Wipit Board 2021. Sharing Experiences.</Text>
    </Flex>
  );
};
