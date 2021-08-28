
import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const UrlError = () => {
    return(
        <Flex align="center" justify="center" direction="column" height="100vh">
            <Text fontSize="15vh">404</Text>
            <Text fontSize="3vh">Ooops!!</Text>
            <Text fontSize="2vh" my="2">Creo que te haz perdido</Text>
            <Link to="/home">
                <Button>Vuelve a casa</Button>
            </Link>
        </Flex>
    )
}