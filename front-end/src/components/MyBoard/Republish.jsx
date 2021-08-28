import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast
} from "@chakra-ui/react";
import { CopyIcon } from '@chakra-ui/icons'
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/reducers/taskReducer/taskActions";

export const Republish = ({ id, onDelete }) => {
  const user = useSelector(store => store.registerReducer.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToast();

  const onClose = () => { setIsOpen(false); }
  const onCancel = () => { setIsOpen(false); }
  const cancelRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setIsOpen(false);
    onDelete();
    toast({
      title: "Tarea republicada",
      status: "info",
      isClosable: true,
      position: "top"
    })
    axios.get(`http://localhost:3001/task/${id}`)
      .then(res => res.data)
      .then(task => {
        let languagesObj = task.languages.map(lang => lang.id.toString())
        let republish = {
          copyOriginalID: task.id,
          title: task.title,
          description: task.description,
          status: "sprint",
          purpose: task.purpose,
          area: task.area,
          difficulty: task.difficulty,
          howlong: task.howlong,
          otherLang: task.otherLang,
          userName: user.userName
        }
        dispatch(createTask({ ...republish, languages: languagesObj && languagesObj }))
      });
  };


  return (
    <>
      <Button variant="ghost" size="md"  onClick={() => setIsOpen(true)}>
        <CopyIcon m={1} />  Republicar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        returnFocusOnClose={false}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Republicar Tarea
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro de republicar tu tarea?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancel}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={(e) => handleSubmit(e)}
                ml={3}>
                Republicar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
