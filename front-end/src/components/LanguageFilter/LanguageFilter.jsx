import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addLanguageFilter, getLanguages, removeLanguageFilter, clearLanguageFilter } from "../../redux/reducers/languageFilterReducer/languageFilterAction";
import { Box, Button, Select } from '@chakra-ui/react';

export function LanguageFilter() {
    const dispatch = useDispatch()

    const languageFilterLoaded = useSelector(state => state.languageFilterReducer.languageFilterloaded)
    const languageFilter = useSelector(state => state.languageFilterReducer.languageFilter)
    const areaFilter = useSelector(state => state.simpleFilterReducer.areaFilter)
    useEffect(() => {
        dispatch(getLanguages(areaFilter ? areaFilter : ''))
        dispatch(clearLanguageFilter(areaFilter))
    }, [areaFilter, dispatch])


    function onChange(language) {
        dispatch(addLanguageFilter(language))
    }
    function onClick(language) {
        dispatch(removeLanguageFilter(language))
    }
    return (
        <Box>
            <Select w="20vh" bg="white" onChange={(e) => onChange(e.target.value)} value="Lenguaje..." margin="1vh">
                <option disabled="disabled" >Lenguaje...</option>
                {languageFilterLoaded.map((l, id) => <option id={id} key={id} value={l.name}>{l.name}</option>)}
            </Select>

            {languageFilter.map((l, i) =>
                <Button _hover={{
                    color: "white",
                    bg: "red.400"
                }}
                    fontSize='smaller'
                    w="20vh"
                    h='5vh'
                    ml="1vh"
                    mb='1vh' type="button" key={i} value={l} name={l} id={i} onClick={(e) => onClick(e.target.name)}>
                    {l}
                </Button>
            )}
        </Box>
    )
}