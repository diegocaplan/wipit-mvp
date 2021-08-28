import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Text,
  useToast,
  Box,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  Textarea,
} from "@chakra-ui/react";

export default function FeedbackForm() {
  const toast = useToast();
  const [error, setError] = useState({
    name: null,
    comments: null
  })
  const [inputs, setInputs] = useState({
    name: "",
    comments: ""
  })

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function validate(e) {
    if (e.target.value === null || e.target.value === "") {
      return setError({ ...error, [e.target.name]: "campo obligatorio", flag: true });
    } else {
      return setError({ ...error, [e.target.name]: null, flag: false });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (error.flag === false && inputs.name !== '') { //ver que los inputs.algo esten llenos para no poder enviar un from vacio    
      toast({
        title: "Comentarios enviados!.",
        description: "Tus comentarios han sido enviados!.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // aca la creación de la tarea
      await axios.post("http://localhost:3001/feedback", { name: inputs.name, comments: inputs.comments })

      setInputs({
        name: "",
        comments: "",
      });
      e.target.reset();
      window.location.href = "http://localhost:3000/myboard"
    } else {
      toast({
        title: "Tus comentarios no se han podido enviar",
        description: "Por favor, completa el formulario.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }


  return (
    <Box h="100vh" align="center" justify="center" bgGradient="wipitHeader">
      <Box
        rounded="10px"
        border="2px"
        borderColor="pink"
        p="10px"
        align="center"
        justify="center"
        w="75%"
        h="auto"
      >
        <Tooltip placement="auto" label="Dejanos tus comentarios" aria-label="A tooltip">
          <Text
            cursor="default"
            w="400px"
            borderColor="pink.300"
            borderBottom="4px"
          >
            Dejanos tus comentarios
          </Text>
        </Tooltip>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="stat">
            <Input
              w="30%"
              size="sm"
              rounded="10px"
              variant="filled"
              m="5px"
              p="5px"
              focusBorderColor="pink.400"
              name="name"
              type="text"
              value={inputs.name}
              placeholder="Escribe tu nombre..."
              onChange={handleInputChange}
              onKeyUp={validate}
              onBlur={validate}
            />
            {error.name ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{error.name}!</AlertTitle>
              </Alert>
            ) : null}
          </div>
          <div className="stat">
            <Textarea
              w="50%"
              size="lg"
              m="5px"
              p="5px"
              rounded="10px"
              variant="filled"
              focusBorderColor="pink.400"
              name="comments"
              type="text"
              value={inputs.comments}
              placeholder="Escribe tu comentario..."
              onChange={handleInputChange}
              onKeyUp={validate}
              onBlur={validate}
            />
            {error.comments ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{error.comments}!</AlertTitle>
              </Alert>
            ) : null}
          </div>
          <Tooltip placement="auto" label="Enviar" aria-label="A tooltip">
            <Button
              w="30%"
              type="submit"
              variant="primary"
            >
              Enviar
            </Button>
          </Tooltip>
        </form>
      </Box>
    </Box>
  )
}
