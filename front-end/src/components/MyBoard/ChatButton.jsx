import { Button, Flex } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import React from "react";
import {useDispatch} from "react-redux"
import {setRoom} from "../../redux/reducers/roomReducer/roomActions"

export const ChatButton = ({roomId}) => {
  const dispatch = useDispatch()

  function onClick(val) {
      dispatch(setRoom(val)) 
  }

  return (
    <Flex alignItems="center">
        <Button onClick={()=>onClick(roomId)} variant="ghost" size="md" >
          <ChatIcon /> Chat
        </Button>
    </Flex>
  );
};
