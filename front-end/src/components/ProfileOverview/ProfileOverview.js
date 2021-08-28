import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Button, Text, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ProfileOverview = () => {
  const [tasks, setTasks] = useState({
    pending: "",
    inProgress: "",
    finished: "",
  });
  const user = useSelector((state) => state.registerReducer.user);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tasks?userName=${user.userName}`)
      .then((response) => {
        setTasks({
          ...tasks,
          pending: response.data.filter((e) => e.status === "sprint").length,
          inProgress: response.data.filter((e) => e.status === "in progress")
            .length,
          finished: response.data.filter(
            (e) => e.status === "done" || e.status === "archived"
          ).length,
        });
      });
  }, [user]);

  return (
    <Flex
      flexDir="column"
      bg="blueRadialGradient"
      align="center"
      ml="10%"
      w="100%"
      h="30%"
      borderRadius="0.3rem"
    >
      <Box h="5%" w="100%" />

      <Img
        src={user.image}
        borderRadius="100%"
        bg="white"
        h="20vh"
        w="20vh"
        m="10px"
        border="5px solid white"
        transform="translateY(35%)"
        shadow="lg"
      />

      <Flex
        flexDir="column"
        align="center"
        pt="15%"
        bg="white"
        h="65%"
        w="100%"
        borderBottomRadius="0.3rem"
      >
        <Link to={`/user/${user.userName}`}>
          <Button
            variant="link"
            fontSize="xl"
            color="black"
            mb="5%"
            _hover={{
              color: "wipit",
            }}
          >
            {user.name} {user.lastName}
          </Button>
        </Link>
        <Flex>
          <Text
            fontSize="sm"
            w="20vw"
            minH="15vh"
            textAlign="center"
            color="blackAlpha.600"
          >
            {user.description || "Aún no has agregado información a tu perfil."}
          </Text>
        </Flex>
        <Flex
          p="5%"
          bg="white"
          width="100%"
          justify="space-between"
          borderRadius="0.3rem"
        >
          <Flex flexDir="column" align="center">
            <Text fontWeight="semibold">{tasks.pending}</Text>
            <Text textAlign="center" fontSize="sm" color="blackAlpha.600">
              PENDIENTES
            </Text>
          </Flex>
          <Flex flexDir="column" align="center">
            <Text fontWeight="semibold">{tasks.inProgress}</Text>
            <Text textAlign="center" fontSize="sm" color="blackAlpha.600">
              EN PROGRESO
            </Text>
          </Flex>
          <Flex flexDir="column" align="center">
            <Text fontWeight="semibold">{tasks.finished}</Text>
            <Text textAlign="center" fontSize="sm" color="blackAlpha.600">
              FINALIZADAS
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
