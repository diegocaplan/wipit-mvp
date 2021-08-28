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
  import { DeleteIcon } from '@chakra-ui/icons';
  import React from "react";
  

  export const DeleteButton = ({onDelete, status}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toast = useToast();

    const onClose = () => {
      setIsOpen(false);
    }
    const onCancel = () => {
      setIsOpen(false);
    }
    const onCloseDelete = () => {
      setIsOpen(false);
      onDelete();
      toast({
        title: "Tarea eliminada",
        status: "info",
        isClosable: true,
        position: "top"
      })
    }
    const cancelRef = React.useRef();
  
    return (
      <>
        <Button variant="ghost" size="md" onClick={() => setIsOpen(true)}>
          {status === "sprint" ? <><DeleteIcon/>  Eliminar</> : <></>} 
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
                Eliminar Tarea
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Estás seguro? No podrás revertir esta acción.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCancel}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={onCloseDelete} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }