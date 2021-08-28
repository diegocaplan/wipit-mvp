import {
  Text,
  Button,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon
} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/hooks';
import React, { useState } from 'react'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Rating } from 'react-simple-star-rating';
import axios from "axios";

export default function ReviewAssigned({ taskId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const toast = useToast();
  const [authorLanguageReview, setAuthorLanguageReview] = useState(0);
  const [authorPurposeReview, setAuthorPurposeReview] = useState(0);
  const [authorAreaReview, setAuthorAreaReview] = useState(0);
  const [authorTimeReview, setAuthorTimeReview] = useState(0);
  const [authorDifficultyReview, setAuthorDifficultyReview] = useState(0);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:3001/task/${taskId}`, { 
        updatedTask: { 
          authorLanguageReview: authorLanguageReview * 20,
          authorPurposeReview: authorPurposeReview * 20,
          authorAreaReview: authorAreaReview * 20, 
          authorTimeReview: authorTimeReview * 20, 
          authorDifficultyReview: authorDifficultyReview * 20 
        } 
      });
      toast({
        title: "¡Gracias por tu opinión!",
        status: "info",
        isClosable: true,
        position: "top"
      })
      onClose();
    } catch (error) {
      console.log(error, "error al submitear review");
    }
  }

  return (
    <>
      <Button variant="ghost" size="md" onClick={onOpen}>
      <><Icon boxSize={4} m={2} as={BsFillPersonLinesFill} />  Dar review </>
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >

        <ModalContent>
          <ModalHeader>¿Cómo evalúas a tu compañero según...?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Lenguaje</Text>
            <Rating onClick={(e) => setAuthorLanguageReview(e)} ratingValue={authorLanguageReview} />
            <Text>Área</Text>
            <Rating onClick={(e) => setAuthorAreaReview(e)} ratingValue={authorAreaReview} />
            <Text>Objetivo</Text>
            <Rating onClick={(e) => setAuthorPurposeReview(e)} ratingValue={authorPurposeReview} />
            <Text>Estimación de tiempo</Text>
            <Rating onClick={(e) => setAuthorTimeReview(e)} ratingValue={authorTimeReview} />
            <Text>Estimación de dificultad</Text>
            <Rating onClick={(e) => setAuthorDifficultyReview(e)} ratingValue={authorDifficultyReview} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} mr={3}>
              Enviar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}