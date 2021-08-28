import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, VStack, Text, HStack } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";
import { Flex, useToast } from "@chakra-ui/react";
import { AssignationButton } from "../Backlog/AssignationButton";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteButton } from "../MyBoard/DeleteButton";
import axios from 'axios';
import socket from "../Chat/socket";

export default function Task({ task }) {
  const { title, description, difficulty, howlong, languages } = task;

  const toast = useToast();
  const user = useSelector(state => state.registerReducer.user)

  const location = useLocation();
  const renderAssignButton = location.pathname === "/home" && task.author.userName !== user.userName;
  const renderDeleteButton = location.pathname === "/home" && task.author.userName === user.userName;

  async function handleDeleteTask() {
    try {
      await axios.delete(`http://localhost:3001/task/${task.id}`)
      toast({
        title: "Tarea Eliminada!",
        description: "Tu Tarea se ha eliminado correctamente!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = "http://localhost:3000/myboard"
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAssignation() {
    try {
      await axios.put(`http://localhost:3001/task/${task.id}`, { userName: user.userName }) //hardcodeado o no?
      await axios.put(`http://localhost:3001/task/${task.id}`, { updatedTask: { status: "in progress" } })
      toast({
        title: "Tarea Asignada!",
        description: "Tu Tarea se ha asignado correctamente!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      socket.emit("notification", user.userName, task.id, "activated")
      window.location.href = "http://localhost:3000/myboard"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box bg="white"  borderRadius="0.5rem" w="100%" m="15px" p="2.5%">
      <Grid templateColumns="3.5vw auto">
        <Box>
          <Link to={`/user/${task.author.userName}`}>
            <Img
              w="2.5vw"
              h="2.5vw"
              src={task.author.image}
              borderRadius="100%"
              alt="foto perfil"
            />
          </Link>
        </Box>
        <VStack alignItems="flex-start">
          <HStack spacing="0.5rem">
            {languages.map((e, i) => (
              <Link
                key={i}
                to={{
                  pathname: "/home",
                  state: {
                    languageFilters: e,
                  },
                }}
              >
                <Text
                  color="black"
                  _hover={{
                    color: "wipit",
                  }}
                  fontSize="md"
                  fontWeight="semibold"
                >
                  {"#" + e}
                </Text>
              </Link>
            ))}
          </HStack>
          <Text fontSize="xl" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="sm" textAlign="justify" noOfLines={8}>
            {description}
          </Text>
          <Text fontSize="sm">🧠 {difficulty}</Text>
          <Text fontSize="sm">🕥 {howlong}</Text>
          {renderAssignButton ?
            <Flex width="100%" justify="flex-end">
              <AssignationButton handleAssignation={handleAssignation} />
            </Flex>
            : <></>
          }
          {renderDeleteButton ?
            <Flex width="100%" justify="flex-end">
              <DeleteButton status={"sprint"} onDelete={handleDeleteTask} />
            </Flex>
            : <></>
          }

        </VStack>
      </Grid>
    </Box>
  );
}
