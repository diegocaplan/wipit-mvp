import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { Badge, Box, Flex, Text, Button, useToast } from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  clearDetail,
  getTaskDetail,
} from "../../redux/reducers/taskReducer/taskActions";
import socket from "../Chat/socket";

function TaskDetail() {
  const taskDetail = useSelector((state) => state.taskReducer.taskDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const toast = useToast();
  const user = useSelector(state => state.registerReducer.user)

  useEffect(() => {
    dispatch(getTaskDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  async function handleClick(e) {
    try {
      e.preventDefault();
      toast({
        title: "Tarea Asignada!.",
        description: "Tu Tarea se ha asignado correctamente!.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      socket.emit("notification", user.userName, id, "activated")
      window.location.href = "http://localhost:3000/myboard"
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex align="center" justify="center" height="100vh">
      {taskDetail && taskDetail.title ? (

        <Flex bg="#F9F4F0" w="500px" borderWidth="2px" borderColor="#47749D" p={6} rounded="8px" overflow="hidden" flexDir="column" key={taskDetail.id}>
          <Button variant="unstyled" onClick={() => history.goBack()}>
            <ArrowBackIcon w={6} h={6} /> Volver
          </Button>
          <div>
            <Text fontSize={40} textAlign={['left', 'center']}>{taskDetail.title}</Text>
            <Text fontSize={20} textAlign={['left']}>{taskDetail.description}</Text>
          </div>
          <div>
            <Badge colorScheme="blue" m={2} p={2} >{taskDetail.status}</Badge>
            <Badge colorScheme="blue" m={2} p={2}>{taskDetail.purpose}</Badge>
            <Badge colorScheme="blue" m={2} p={2}>{taskDetail.area}</Badge>
            <Badge colorScheme="blue" m={2} p={2}>{taskDetail.difficulty}</Badge>
            {taskDetail.languages && taskDetail.languages.map((l, i) =>
              <Link key={i}
                to={{
                  pathname: "/home",
                  state: {
                    languageFilters: l.name,
                  },
                }}
              >
                <Badge key={l.name} colorScheme="pink" m={2} p={2}># {l.name}</Badge>
              </Link>
            )}
            <Box>
              <Badge colorScheme="blue" m={2} p={2}>{taskDetail.howlong}</Badge>
            </Box>

          </div>
          {user.userName === taskDetail.author.userName || taskDetail.assigned.find(u => u.userName === user.userName) ?
            <Link to={`/chat/${id}`}><Button size="lg" m={2} p={2} variant="primary" alignSelf="center" justifySelf="center" >IR AL CHAT</Button></Link>
            :
            <Button onClick={handleClick} colorScheme="#FE2865" m={2} p={2} size="lg"
              alignSelf="center"
              justifySelf="center"
              type="submit"
              variant="primary">
              Asignarme esta tarea
            </Button>
          }
        </Flex>
      ) : (
        <span>CARGANDO...</span>
      )}
    </Flex>
  );
}

export default TaskDetail;
