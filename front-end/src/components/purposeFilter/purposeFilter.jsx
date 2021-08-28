import React,{ useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addPurposeFilter, getPurpose, removePurposeFilter } from "../../redux/reducers/purposeFilterReducer/purposeFilterAction";
import { Box, Button} from '@chakra-ui/react';

export function PurposeFilter(){
    const dispatch = useDispatch()

    const purposeFilterLoaded  = useSelector(state => state.purposeFilterReducer.purposeFilterloaded)
    const purposeFilter  = useSelector(state => state.purposeFilterReducer.purposeFilter)

    useEffect(() => {
        dispatch(getPurpose())
    },[])

    
    function onChange(purpose) {
        dispatch(addPurposeFilter(purpose))
      }
    function onClick() {
        dispatch(removePurposeFilter())
    }
    return (
        <Box>
            <select onChange={(e)=>onChange(e.target.value)} value="Purpose..." w="15vh">

            <option disabled="disabled" >Purpose...</option>  
            {purposeFilterLoaded.map((a,id) => a?<option id ={id} key={id} value={a}>{a}</option>:'')}
            </select>
            <br></br>
            {purposeFilter?
            <Button type="button" value={purposeFilter} name={purposeFilter} type = 'button' id={{purposeFilter}} onClick= {()=>onClick()}>
            {purposeFilter} ❌
            </Button>:''
            }   
        </Box>
    )
}


