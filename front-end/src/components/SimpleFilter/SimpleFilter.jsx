import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSimpleFilter,
  getGlobalConstants,
  removeSimpleFilter,
} from "../../redux/reducers/simpleFilterReducer/simpleFilterAction";
import { Box, Button, Select, Flex } from "@chakra-ui/react";

export function SimpleFilter({ filter: filters, campo, texto }) {
  const dispatch = useDispatch();

  const globalconstants = useSelector(
    (state) => state.simpleFilterReducer.globalconstants
  );

  useEffect(() => {
    dispatch(getGlobalConstants());
  }, [dispatch]);

  function onChange(area) {
    dispatch(addSimpleFilter(area, campo));
  }
  function onClick(selectedOption) {
    dispatch(removeSimpleFilter(selectedOption, campo));
  }
  return (
    <Box>
      {globalconstants[campo.toUpperCase()] ? (
        <Select
          bg="white"
          margin="1vh"
          w="8em"
          onChange={(e) => onChange(e.target.value)}
          value={texto + "..."}
        >
          <option disabled="disabled">{texto + "..."}</option>
          {globalconstants[campo.toUpperCase()].map((a, id) =>
            a ? (
              <option id={id} key={id} value={a}>
                {a}
              </option>
            ) : (
              ""
            )
          )}
        </Select>
      ) : (
        ""
      )}

      <Flex direction="column" alignItems="start">
        {filters
          ? filters.map((filter, i) => (
            <Button
              _hover={{
                color: "white",
                bg: "red.400"
              }}
              fontSize='smaller'
              w="10em"
              h='5vh'
              ml="1vh"
              mb='1vh'
              type="button"
              value={filter}
              name={filter}
              id={{ i }}
              onClick={(e) => onClick(e.target.value)}
            >
              {filter}
            </Button>
          ))
          : ""}
      </Flex>
    </Box>
  );
}
