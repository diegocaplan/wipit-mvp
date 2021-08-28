import React from "react";
import { useDispatch } from "react-redux";
import { Input } from "@chakra-ui/input";
import { Flex, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { updateSearch } from "../../redux/reducers/searchReducer/searchAction";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar({ searchFilter }) {
  const dispatch = useDispatch();

  return (
    <Flex width="100%" mt="1%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          variant="outline"
          bg='gray.200'
          type="text"
          placeholder="Buscar..."
          value={searchFilter}
          onChange={(e) => dispatch(updateSearch(e.target.value))}
        />
      </InputGroup>
      {/* <Text>🔍️</Text>  */}
    </Flex>
  );
}
