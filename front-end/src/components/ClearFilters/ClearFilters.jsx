import React from "react";
import { useDispatch } from "react-redux";

import { Flex, Button } from "@chakra-ui/react";
import { clearFilters } from "../../redux/reducers/simpleFilterReducer/simpleFilterAction";
import { clearLanguageFilter } from "../../redux/reducers/languageFilterReducer/languageFilterAction";

export default function ClearFilters() {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(clearFilters());
    dispatch(clearLanguageFilter());
  }

  return (
    <Flex>
      <Button
        m='1%'
        borderRadius="0.5rem"
        w="100%"
        type="button"
        onClick={() => onClick()}
      >
        Clear Filters
      </Button>
    </Flex>
  );
}
