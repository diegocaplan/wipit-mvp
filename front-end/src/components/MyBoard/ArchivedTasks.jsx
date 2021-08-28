import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Icon
} from "@chakra-ui/react";
import { BiArchive } from "react-icons/bi";
import Task from "../Task/Task";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ArchivedTasks() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [archivedTasks, setArchivedTasks] = useState([]);
  const userName = useSelector(state => state.registerReducer.user.userName)

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/tasks?userName=${userName}`).then(res => res.data)
        .then(tasks => {
          tasks = tasks.map(task => { return { ...task, languages: task.languages.map(l => l.name) } });
          setArchivedTasks(tasks.filter(t => t.status === 'archived'));
        })
    } catch (error) {
      console.log(error);
    }
  }, [userName])

  return (
    <>
      <Button ref={btnRef} variant="unstyled" onClick={onOpen} _focus={{ boxShadow: "none" }}>
        <><Icon boxSize={4} as={BiArchive} /> </>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tareas archivadas</DrawerHeader>

          <DrawerBody>
            {archivedTasks.map(t =>
              <Task key={t.id}
                task={t}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ArchivedTasks;