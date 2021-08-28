import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDateOrder,
  removeDateOrder,
} from "../../redux/reducers/orderReducer/orderAction";
import { Box, Button, Select } from "@chakra-ui/react";

export default function TasksOrder() {
  const order = ["Mas reciente", "Mas antiguo"];

  const dateOrder = useSelector((state) => state.orderReducer.dateOrder);

  const dispatch = useDispatch();

  function onChange(order) {
    dispatch(addDateOrder(order));
  }

  function onClick() {
    dispatch(removeDateOrder());
  }

  return (
    <Box>
      <Select
        w="20vh"
        bg="white"
        margin="1vh"
        onChange={(e) => onChange(e.target.value)}
        value="Fecha..."
      >
        <option disabled="disabled">Fecha...</option>
        {order.map((o, id) => (
          <option id={id} key={id} value={o}>
            {o}
          </option>
        ))}
      </Select>
      {dateOrder.length ? (
        <Button
          _hover={{
            color: "white",
            bg: "red.400",
          }}
          fontSize="smaller"
          w="20vh"
          h="5vh"
          ml="1vh"
          mb="1vh"
          type="button"
          value={dateOrder}
          name={dateOrder}
          id={{ dateOrder }}
          onClick={() => onClick()}
        >
          {dateOrder}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
