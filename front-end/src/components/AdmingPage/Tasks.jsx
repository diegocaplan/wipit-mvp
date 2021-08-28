import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

function Tasks({ dateFrom, dateTo }) {
  const [tasks, setTasks] = useState(null);

  var total = 0;
  var totalSprint = 0;
  var totalProgress = 0;
  var totalFinished = 0;
  var periodo = 0;
  var totalSprintPeriodo = 0;
  var totalProgressPeriodo = 0;
  var totalFinishedPeriodo = 0;

  useEffect(() => {
    axios.get("http://localhost:3001/tasks/").then((rta) => {
      setTasks(rta.data);
    });
  }, []);

  tasks &&
    tasks.forEach((task) => {
      total++;
      if (task.deleted === false) {
        if (task.status === "sprint") totalSprint++;
        else if (task.status === "in progress") totalProgress++;
        else totalFinished++;
      }
      let date = task.createdAt.toLocaleString();
      if (
        date.slice(0, date.length - 14) >= dateFrom &&
        date.slice(0, date.length - 14) <= dateTo
      ) {
        periodo++;
        if (task.deleted === false) {
          if (task.status === "sprint") totalSprintPeriodo++;
          else if (task.status === "in progress") totalProgressPeriodo++;
          else totalFinishedPeriodo++;
        }
      }
    });

  return (
    <>
      <Flex w="100%">
        <Table variant="striped">
          <Tbody>
            <Tr>
              <Td>Cantidad total</Td>
              <Td isNumeric>{total}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad total en sprint</Td>
              <Td isNumeric>{totalSprint}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad total en progreso </Td>
              <Td isNumeric>{totalProgress}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad total finalizadas</Td>
              <Td isNumeric>{totalFinished}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad creados en el periodo:</Td>
              <Td isNumeric>{periodo}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad de tareas en sprint en el periodo</Td>
              <Td isNumeric>{totalSprintPeriodo}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad de tareas en progreso en el periodo</Td>
              <Td isNumeric>{totalProgressPeriodo}</Td>
            </Tr>
            <Tr>
              <Td>Cantidad de tareas finalizadas en el periodo</Td>
              <Td isNumeric>{totalFinishedPeriodo}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default Tasks;
