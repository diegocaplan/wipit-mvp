import React from 'react';
import axios from "axios";
import {
  Flex,
  Select,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Switch
} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/hooks';

export default function ReviewAuthor({ onFinish, taskId }) {
  const [resolved, setResolved] = React.useState(false);
  const [option, setOption] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const toast = useToast();

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (option === "") {
        toast({
          title: "Tu reseña no ha podido ser enviado.",
          description: "Por favor, completa el campo.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      else {
        await axios.put(`http://localhost:3001/task/${taskId}`, { updatedTask: { taskComplete: resolved, assignedReview: option } })
        setOption("");
        onFinish();
        toast({
          title: "Tarea finalizada, ¡Gracias por tu reseña!",
          status: "info",
          isClosable: true,
          position: "top"
        })
        onClose();
      }
    } catch (error) {
      console.log(error, "error al submitear review");
    }
  }

  return (
    <>
      <Button m={3} onClick={onOpen} bg="green.300" bgGradient="linear(to-r, twitter.300, twitter.200)" color="white"
        _hover={{
          bgGradient: "linear(to-r, green.300, green.200)",
          color: "white.50"
        }}>Hacer una reseña</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Cómo fue tu experiencia en esta tarea? </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Flex display="-ms-inline-flexbox">
                <FormLabel>¿Se resolvío la tarea?</FormLabel>

                NO
                <Switch m={4} size="md" isChecked={resolved} onChange={() => setResolved(!resolved)} />
                SI
              </Flex>
              {resolved ? <FormLabel>¿Cómo calificarías tu experiencia con tu compañero?</FormLabel> : <FormLabel>¿Por qué?</FormLabel>}
              {resolved === true ?
                <Select placeholder="Selecciona una opción" name="resolvedTrue" onChange={(e) => setOption(e.target.value)}>
                  <option value="Buen compañero">Buen compañero</option>
                  <option value="Gran desarrollador">Gran desarrollador</option>
                  <option value="Muy rápido por suerte">Muy rápido por suerte</option>
                  <option value="Lo terminé resolviendo yo">Lo terminé resolviendo yo</option>
                  <option value="Lo resolvió pero no me gustó cómo">Lo resolvió pero no me gustó cómo</option>
                </Select>
                :

                resolved === false ?
                  <Select placeholder="Selecciona una opción" name="resolvedFalse" onChange={(e) => setOption(e.target.value)} >
                    <option value="No tenía conocimientos suficientes para ayudarme">No tenía conocimientos suficientes para ayudarme</option>
                    <option value="No tuvo paciencia">No tuvo paciencia</option>
                    <option value="Por problemas ajenos a mi compañero">Por problemas ajenos a mi compañero</option>
                    <option value="Por falta de tiempo">Por falta de tiempo</option>
                    <option value="Por mi culpa">Por mi culpa</option>
                  </Select>
                  : <Select placeholder="Selecciona una opción"></Select>}

            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button bg="green.300" bgGradient="linear(to-r, twitter.300, twitter.200)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, green.300, green.200)",
                color: "white.50"
              }}
              mr={3}
              onClick={handleSubmit}>
              Enviar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
