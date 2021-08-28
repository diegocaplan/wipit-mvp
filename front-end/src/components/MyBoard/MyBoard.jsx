import axios from "axios";
import React, { useEffect, useState } from "react";
import { BoardColumn } from "./BoardColumn";
import { Box, Grid, Flex, Text, Center } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { useSelector } from "react-redux";
import socket from '../Chat/socket'
import AccordionPostTask from "../postNewTask/AccordionPostTask";

export const MyBoard = () => {
    const [backLogTasks, setBackLogTasks] = useState([]);
    const [inProcessTasks, setInProcessTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const userName = useSelector(state => state.registerReducer.user.userName)

    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/tasks?userName=${userName}`).then(res => res.data)
                .then(tasks => {
                    tasks = tasks.map(task => { return { ...task, languages: task.languages.map(l => l.name) } });
                    setBackLogTasks(tasks.filter(t => t.status === "sprint"));
                    setInProcessTasks(tasks.filter(t => t.status === "in progress"));
                    setDoneTasks(tasks.filter(t => t.status === "done"))
                })
        } catch (error) {
            console.log(error);
        }
    }, [userName])

    const onSprint = async (taskId) => {
        try {
            await axios.put(`http://localhost:3001/task/${taskId}`, { updatedTask: { status: "sprint" } })
            let task = inProcessTasks.find(t => t.id === taskId);
            task.status = "sprint";
            setInProcessTasks(inProcessTasks.filter(t => t.id !== taskId));
            setBackLogTasks([...backLogTasks, task]);
        } catch (error) {
            console.log(error);
        }
    }
    const onInProgress = async (taskId) => {
        try {
            await axios.put(`http://localhost:3001/task/${taskId}`, { updatedTask: { status: "in progress" } })
            let task = backLogTasks.find(t => t.id === taskId);
            task.status = "in progress";
            setBackLogTasks(backLogTasks.filter(t => t.id !== taskId));
            setInProcessTasks([...inProcessTasks, task]);
        } catch (error) {
            console.log(error)
        }
    }
    const onFinish = async (taskId) => {
        try {
            await axios.put(`http://localhost:3001/task/${taskId}`, { updatedTask: { status: "done" } })
            let task = inProcessTasks.find(t => t.id === taskId);
            task.status = "done";
            setInProcessTasks(inProcessTasks.filter(t => t.id !== taskId));
            setDoneTasks([...doneTasks, task]);
            socket.emit("notification", userName, taskId, "finished")
        } catch (error) {
            console.log(error)
        }
    }
    const onArchived = async (taskId) => {
        try {
            await axios.put(`http://localhost:3001/task/${taskId}`, { updatedTask: { status: "archived" } })
            let task = doneTasks.find(t => t.id === taskId);
            task.status = "archived";
            setDoneTasks(doneTasks.filter(t => t.id !== taskId));
            socket.emit("notification", userName, taskId, "archived")
        } catch (error) {
            console.log(error)
        }
    }
    const onDelete = async (taskId, status) => {
        try {
            await axios.delete(`http://localhost:3001/task/${taskId}`)
            if (status === "sprint") { setBackLogTasks(backLogTasks.filter(t => t.id !== taskId)) }
            else if (status === "in progress") { setInProcessTasks(inProcessTasks.filter(t => t.id !== taskId)) }
            else { setDoneTasks(doneTasks.filter(t => t.id !== taskId)) }
        } catch (error) {
            console.log(error);
        }
    }

    const events = {
        onSprint,
        onFinish,
        onInProgress,
        onDelete,
        onArchived
    }

    return (
        <Center>
            <Flex width="60vw" flexDirection="column" alignItems="center" my="5vh">
                <Box
                    color="white"
                    width="100%"
                    borderRadius="md"
                    d="flex"
                    alignItems="center"
                    my="5"
                    pl="8%"
                    py="2"
                    bg="blueGradient"
                    h="20vh"
                    minH="150px"
                >
                    <CalendarIcon w={12} h={12} />
                    <Flex flexDir="column" ml="5%">
                        <Text fontSize="4xl" fontWeight="semibold">
                            MIS TAREAS
                        </Text>
                        <Text fontSize="2xl">Seguimiento para tus tareas pendientes, en progreso y finalizadas</Text>
                    </Flex>
                </Box>
                <Box width="100%" bg="white" p="3" borderWidth="1px" borderRadius="md">
                    <AccordionPostTask />
                </Box>
                <Grid width="100%" templateColumns="repeat(3, 1fr)" alignItems="stretch" gap={6} py="6">
                    <BoardColumn columnTitle={"Pendientes"} tasks={backLogTasks} events={events} />
                    <BoardColumn columnTitle={"En progreso"} tasks={inProcessTasks} events={events} />
                    <BoardColumn columnTitle={"Finalizadas"} tasks={doneTasks} events={events} />
                </Grid>
            </Flex>
        </Center>
    )
}