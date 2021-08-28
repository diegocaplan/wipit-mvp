import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function AdminTasks() {
  const [tasks, setTasks] = useState(null);
  const [filters, setFilters] = useState({
    input: null,
    deleted: null,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/tasks/").then((rta) => {
      setTasks(rta.data);
    });
  }, []);

  var tasksFiltered = tasks;

  const handleChange = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const checkChange = (e, id) => {
    e.preventDefault();
    let value;
    if (e.target.name === "deleted") {
      e.target.value === "t" ? (value = false) : (value = true);
    }

    let body = {
      updatedTask: { deleted: value },
    };
    axios
      .put(`http://localhost:3001/task/${id}`, body)
      
  };

  if (filters.input) {
    tasksFiltered =
      tasksFiltered &&
      tasksFiltered.filter((task) => {
        var queda = true;
        filters.input.split(" ").forEach((filter) => {
          if (
            task.title.toLowerCase().search(filter.toLowerCase()) < 0 &&
            task.purpose.toLowerCase().search(filter.toLowerCase()) < 0 &&
            task.status.toLowerCase().search(filter.toLowerCase()) < 0 &&
            task.area.toLowerCase().search(filter.toLowerCase()) < 0 &&
            task.howlong.toLowerCase().search(filter.toLowerCase()) < 0 &&
            task.difficulty.toLowerCase().search(filter.toLowerCase()) < 0
          ) {
            queda = false;
          }
        });
        return queda;
      });
  }

  if (filters.deleted) {
    let filtro = filters.deleted === "t" ? true : false;
    tasksFiltered =
      tasksFiltered &&
      tasksFiltered.filter((task) => task && task.deleted === filtro);
  }

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <Flex h="100%" justifyContent="center" flexDirection="column">
          <Flex justifyContent="center">
            <Badge>Bienvenidos a adminTasks</Badge>
          </Flex>
          <Flex>
            <InputGroup p="2vh" m="2vh">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                p="2vh"
                m="2vh"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                name={"input"}
                value={filters.input}
                onChange={(e) => handleChange(e)}
                placeholder="Buscar tarea "
              />
            </InputGroup>
            <Select
              name="deleted"
              onChange={(e) => handleChange(e)}
              p="2vh"
              m="2vh"
              placeholder="Seleccionar"
            >
              <option value="t">Eliminadas</option>
              <option value="f">Activas</option>
            </Select>
          </Flex>
          {tasksFiltered && tasksFiltered.length > 0 ? (
            <Table variant="simple" colorScheme="pink" h="70vh">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>status</Th>
                  <Th>purpose</Th>
                  <Th>area</Th>
                  <Th>difficulty</Th>
                  <Th>howlong</Th>
                  <Th>Other Language</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasksFiltered.map((elem) => {
                  return (
                    <Tr key={elem.id}>
                      <Td>{elem.title}</Td>
                      <Td>{elem.status}</Td>
                      <Td>{elem.purpose}</Td>
                      <Td>{elem.area}</Td>
                      <Td>{elem.difficulty}</Td>
                      <Td>{elem.howlong}</Td>
                      <Td>{elem.otherLang ? elem.otherLang : "No"}</Td>
                      <Td>
                        <Checkbox
                          value={elem.deleted === false ? "f" : "t"}
                          name="deleted"
                          onChange={(e) => checkChange(e, elem.id)}
                          colorScheme="red"
                          defaultIsChecked={elem.deleted ? true : false}
                        ></Checkbox>
                      </Td>
                    </Tr>
                  );
                })}
                <Tr></Tr>
              </Tbody>
            </Table>
          ) : (
            <Badge>No hay tareas</Badge>
          )}
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
}

export default AdminTasks;
