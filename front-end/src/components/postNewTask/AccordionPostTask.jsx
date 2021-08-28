import React from "react";
import { Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import PostTask from "./postTask";
import { CopyIcon } from "@chakra-ui/icons";


export default function AccordionPostTask() {
    return (
        <Accordion w="100%" allowToggle>
            <AccordionItem border="none">
                <AccordionButton _focus={{ boxShadow: "none" }}>
                    <Box flex="1" textAlign="left">
                        <CopyIcon /> Publica una tarea
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <PostTask />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}