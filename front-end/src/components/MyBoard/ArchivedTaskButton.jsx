import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
    Icon
  } from "@chakra-ui/react";
  import { BiArchiveIn } from "react-icons/bi";
  import React from "react";

  export const ArchivedTaskButton = ({onArchived}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toast = useToast();
    const onClose = () => {
      setIsOpen(false);
    }
    const onCancel = () => {
      setIsOpen(false);
    }
    const onCloseFinish = () => {
      setIsOpen(false);
      onArchived();
      toast({
        title: "Tarea Archivada",
        status: "info",
        isClosable: true,
        position: "top"
      })
    }
    const finishRef = React.useRef();
  
    return (
      <>
        <Button variant="ghost" size="md" onClick={() => setIsOpen(true)}>
        <><Icon boxSize={4} m={1} as={BiArchiveIn} />  Archivar </>
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
                Archivar Tarea
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Desea archivar la tarea? No podrás revertir esta acción.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button  onClick={onCancel}>
                  Cancelar
                </Button>
                <Button ref={finishRef} bg="green.300" bgGradient="linear(to-r, twitter.300, twitter.200)" color="white" 
                _hover={{
                    bgGradient: "linear(to-r, green.300, green.200)",
                    color:"white.50"
                  }} onClick={onCloseFinish} ml={3}>
                  Archivar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }