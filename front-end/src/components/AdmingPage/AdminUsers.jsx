import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
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

function AdminUsers() {
  const [usuariosMostrados, setUsuariosMostados] = useState(null);
  const [check, setCheck] = useState("false");
  const [filters, setFilters] = useState({
    input: null,
    role: null,
    deleted: null,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/user/getUsers").then((rta) => {
      setUsuariosMostados(rta.data);
    });
  }, [check]);

  var userFiltered = usuariosMostrados;

  const handleChange = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const checkChange = (e, userName) => {
    e.preventDefault();
    setCheck("true");
    let value;
    if (e.target.name === "deleted") {
      e.target.value === "t" ? (value = false) : (value = true);
    }
    if (e.target.name === "role") {
      e.target.value === "user" ? (value = "admin") : (value = "user");
    }
    let body = {
      userName,
      param: e.target.name,
      value,
    };
    axios
      .put("http://localhost:3001/user/edit", body)
      .then(() => setCheck("false"));
  };

  if (filters.input) {
    userFiltered =
      userFiltered &&
      userFiltered.filter((user) => {
        var queda = true;
        filters.input.split(" ").forEach((filter) => {
          if (
            user.userName.toLowerCase().search(filter.toLowerCase()) < 0 &&
            user.name.toLowerCase().search(filter.toLowerCase()) < 0 &&
            user.lastName.toLowerCase().search(filter.toLowerCase()) < 0 &&
            user.email.toLowerCase().search(filter.toLowerCase()) < 0
          ) {
            queda = false;
          }
        });
        return queda;
      });
  }

  if (filters.role) {
    userFiltered =
      userFiltered &&
      userFiltered.filter((user) => user && user.role === filters.role);
  }

  if (filters.deleted) {
    let filtro = filters.deleted === "t" ? true : false;
    userFiltered =
      userFiltered &&
      userFiltered.filter((user) => user && user.deleted === filtro);
  }

  return (
    <>
      {usuariosMostrados && usuariosMostrados.length > 0 ? (
        <Flex h="100%" justifyContent="center" flexDirection="column">
          <Flex justifyContent="center">
            <Badge>Bienvenidos a adminUsers</Badge>
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
                placeholder="Buscar por userName, name o lastName"
              />
            </InputGroup>
            <Select
              name="role"
              onChange={(e) => handleChange(e)}
              p="2vh"
              m="2vh"
              placeholder="Seleccionar"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select>
            <Select
              name="deleted"
              onChange={(e) => handleChange(e)}
              p="2vh"
              m="2vh"
              placeholder="Seleccionar"
            >
              <option value="t">Eliminado</option>
              <option value="f">Activo</option>
            </Select>
          </Flex>
          <Table variant="simple" colorScheme="pink" h="70vh">
            <Thead>
              <Tr>
                <Th>userName</Th>
                <Th>Name</Th>
                <Th>lastName</Th>
                <Th>email</Th>
                <Th>Admin</Th>
                <Th>Ban</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userFiltered &&
                userFiltered.map((elem) => {
                  return (
                    <Tr key={elem.userName}>
                      <Td>{elem.userName}</Td>
                      <Td>{elem.name}</Td>
                      <Td>{elem.lastName}</Td>
                      <Td>{elem.email}</Td>
                      <Td>
                        <Checkbox
                          name="role"
                          value={elem.role}
                          onChange={(e) => checkChange(e, elem.userName)}
                          colorScheme="green"
                          defaultIsChecked={
                            elem.role === "admin" ? true : false
                          }
                        ></Checkbox>
                      </Td>
                      <Td>
                        <Checkbox
                          value={elem.deleted === false ? "f" : "t"}
                          name="deleted"
                          onChange={(e) => checkChange(e, elem.userName)}
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
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
}

export default AdminUsers;
