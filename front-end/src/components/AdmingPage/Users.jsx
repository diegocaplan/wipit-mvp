
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

function Users({ dateFrom, dateTo }) {

  const [users, setUsers] = useState(null)


  var total = 0
  var totalActivos = 0
  var periodo = 0
  var periodoActivos = 0

  useEffect(() => {
    axios.get("http://localhost:3001/user/getUsers").then((rta) => {
      setUsers(rta.data);
    });
  }, []);

  users && users.forEach(user => {
    total++;
    if (user.deleted === false) totalActivos++;
    let date = user.createdAt.toLocaleString()
    if (date.slice(0, date.length - 14) >= dateFrom && date.slice(0, date.length - 14) <= dateTo) {
      periodo++;
      if (user.deleted === false) periodoActivos++;
    }
  })

  return (
    <Flex w="100%">
      <Table variant="striped" >
        <Tbody>
          <Tr>
            <Td>Cantidad total</Td>
            <Td isNumeric>{total}</Td>
          </Tr>
          <Tr>
            <Td>Cantidad total activos</Td>
            <Td isNumeric>{totalActivos}</Td>
          </Tr>
          <Tr>
            <Td>Cantidad creados en el periodo</Td>
            <Td isNumeric>{periodo}</Td>
          </Tr>
          <Tr>
            <Td>Cantidad de usuarios activos en el periodo</Td>
            <Td isNumeric>{periodoActivos}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  )
}

export default Users
