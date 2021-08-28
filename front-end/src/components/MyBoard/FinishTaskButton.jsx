import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
  import { CheckIcon } from '@chakra-ui/icons'
  import React from "react";
  import ReviewAuthor from '../Reviews/ReviewAuthor'

  export const FinishTaskButton = ({onFinish, taskId}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => {
      setIsOpen(false);
    }

    const onCancel = () => {
      setIsOpen(false);
    }

    const finishRef = React.useRef();
  
    return (
      <>
        <Button variant="ghost" size="md" onClick={() => setIsOpen(true)}>
          <CheckIcon/>  Finalizar
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={finishRef}
          returnFocusOnClose={false}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Finalizar Tarea
              </AlertDialogHeader>
  
              <AlertDialogBody>
                ¿Ya finalizaste la tarea? Antes deja una reseña.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button onClick={onCancel}>
                  Cancelar
                </Button>
                <ReviewAuthor taskId={taskId} onFinish={onFinish}/>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }