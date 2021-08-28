import { Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import React from "react";

export const AssignationButton = ({handleAssignation}) => {

  return (
    <Button variant="ghost" size="md" onClick={handleAssignation}>
        <PlusSquareIcon /> Asignarme
    </Button>
  );
};