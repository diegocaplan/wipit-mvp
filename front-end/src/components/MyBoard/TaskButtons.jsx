import { DeleteButton } from "./DeleteButton";
import { FinishTaskButton } from "./FinishTaskButton";
import { ChatButton } from "./ChatButton.jsx";
import { Flex } from "@chakra-ui/react";
import { Republish } from "./Republish";
import { ArchivedTaskButton } from "./ArchivedTaskButton";

export const TaskButtons = (props) => {
    const { onFinish, onDelete, onArchived } = props.events;
    const { status, taskId } = props;

    return (
        <>
            <Flex justify="center">
                {status === "sprint" || status === "done" ? <DeleteButton status={status} onDelete={() => onDelete(taskId, status)} /> : <></>}
                {status === "in progress" ? <><FinishTaskButton onFinish={() => onFinish(taskId)} taskId={taskId} /></> : <></>}
                {status === "in progress" ? <ChatButton roomId={taskId} ></ChatButton> : <> </>}
                {status === "done" ? <><Republish id={taskId} onDelete={() => onDelete(taskId, status)} /></> : <></>}
                {status === "done" ? <ArchivedTaskButton onArchived={() => onArchived(taskId)} /> : <></>}
            </Flex>
        </>
    )
}