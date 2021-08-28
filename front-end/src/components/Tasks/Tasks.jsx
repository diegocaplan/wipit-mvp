import { Flex } from "@chakra-ui/react";
import React from "react";
import Task from "../Task/Task";

export default function Tasks({ tasks }) {
    return (
        <Flex flexFlow="column" alignItems='center'>
            {tasks.map(t => <Task key={t.id} task={t} />)}
        </Flex>
    )
};