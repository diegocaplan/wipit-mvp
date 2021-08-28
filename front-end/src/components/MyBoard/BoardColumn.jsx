import React, { useState } from "react";
import Task from "../Task/Task";
import ArchivedTasks from "./ArchivedTasks";
import { TaskButtons } from "./TaskButtons";
import { Box, Button, Flex, Grid, Spacer } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon, MinusIcon } from '@chakra-ui/icons'
import { useSelector } from "react-redux";
import { ChatButton } from "./ChatButton";
import ReviewAssigned from "../Reviews/ReviewAssigned";


export const BoardColumn = ({ columnTitle, tasks, events }) => {
    const [page, setPage] = useState(0);
    const finalPage = tasks.length - 1;
    const user = useSelector(state => state.registerReducer.user)

    const handleSubmitNext = () => {
        if (page === finalPage) { setPage(0) }
        else { setPage(page + 1) }
    }
    const handleSubmitPrevious = () => {
        if (page === 0) { setPage(finalPage) }
        else { setPage(page - 1) }
    }
    const newEvents = {
        onSprint: (taskId) => {
            setPage(0)
            events.onSprint(taskId)
        },
        onInProgress: (taskId) => {
            setPage(0)
            events.onInProgress(taskId)
        },
        onFinish: (taskId) => {
            setPage(0)
            events.onFinish(taskId)
        },
        onDelete: (taskId, status) => {
            setPage(0)
            events.onDelete(taskId, status)
        },
        onArchived: (taskId, status) => {
            setPage(0)
            events.onArchived(taskId, status)
        },
    }

    return (
        <div>
            <Box h="60vh" p={1} borderWidth="1px" borderRadius="md" d="flex" flexDirection="column" alignItems="center" bg="white">
                <Grid h="35px" width="100%" alignItems="center" justifyItems="center" gridTemplateColumns="50px auto 50px" mb="2vh" > <div></div> {columnTitle} {columnTitle === 'Finalizadas' ? (<ArchivedTasks></ArchivedTasks>) : (<></>)}</Grid>
                {tasks.length > 0 ?
                    <>
                        <Flex justifyContent="center" alignItems="center" width="100%" h='60vh'>
                            {tasks.length > 1 ? <><Button onClick={handleSubmitPrevious} variant="ghost" _focus={{ boxShadow: "none" }} size="xs"><ChevronLeftIcon /></Button><Spacer /></> : <Box m="10px"></Box>}
                            <Box h="100%" >
                                <Task task={tasks[page]} />
                            </Box>
                            {tasks.length > 1 ? <><Spacer /><Button onClick={handleSubmitNext} variant="ghost" _focus={{ boxShadow: "none" }} size="xs"><ChevronRightIcon /></Button></> : <Box m="10px"></Box>}
                        </Flex>
                        <Grid autoFlow="column" gap={"1vw"}>
                            {tasks.map((t, i) => {
                                return (<div key={i}>{tasks.length > 1 ? i === page ? <MinusIcon /> : <MinusIcon color="gray.300" /> : <></>}</div>)
                            })}
                        </Grid>
                        {tasks[page].author.userName === user.userName ? <TaskButtons events={newEvents} taskId={tasks[page].id} status={tasks[page].status} /> : <></>}
                        {columnTitle === 'Finalizadas' && tasks[page].author.userName !== user.userName && tasks[page].authorLanguageReview === null ? <ReviewAssigned taskId={tasks[page].id} ></ReviewAssigned> : <> </>}
                        {columnTitle === 'En progreso' && tasks[page].author.userName !== user.userName ? <ChatButton roomId={tasks[page].id} ></ChatButton> : <> </>}
                    </>
                    : <></>}
            </Box>
        </div>
    )
}