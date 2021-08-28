import React, { useState } from "react";
import {
  Flex,
  Grid,
} from "@chakra-ui/react";
import Tasks from "./Tasks";
import Users from "./Users";
function General() {
  const [date, setDate] = useState({
    desde: "2020-12-31",
    hasta: "2025-12-31",
  });

  const dateChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  return (
    <Flex flexDirection="column" w="90%">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Flex m="10px">
          <Flex w="100%" m="10px" alignItems="center" justifyContent="center">
            <label style={{ marginRight: "20px" }}>Desde:</label>
            <input
              name="desde"
              value={date.desde}
              onChange={(e) => dateChange(e)}
              type="date"
              min="2020-12-31"
              max="2025-12-31"
            ></input>
            {/* cambiar segun inicio de wipit */}
          </Flex>
          <Flex w="100%" m="10px">
            <label style={{ marginRight: "20px" }}>Hasta:</label>
            <input
              name="hasta"
              value={date.hasta}
              onChange={(e) => dateChange(e)}
              type="date"
              min="2020-12-31"
              max="2025-12-31"
            ></input>
          </Flex>
        </Flex>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Flex w="100%" h="100%" bg="wipit" borderRadius="10px">
          <Users dateFrom={date.desde.toLocaleString()} dateTo={date.hasta.toLocaleString()}></Users>
        </Flex>
        <Flex w="100%" h="100%" bg="wipit" borderRadius="10px">
          <Tasks dateFrom={date.desde.toLocaleString()} dateTo={date.hasta.toLocaleString()}></Tasks>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default General;