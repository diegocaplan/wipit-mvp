import React,{ useState, useEffect } from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button, Flex, Icon } from "@chakra-ui/react";

export const ScrollUp = () => {
    const [showScroll, setshowScroll] = useState(false)

    const checkScrollTop = React.useCallback(() => {
        if(!showScroll && window.pageYOffset > 400){
            setshowScroll(true)
        } else if(showScroll && window.pageYOffset <=400){
            setshowScroll(false)
        }
    },[showScroll])

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior:'smooth'})
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)

        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    }, [checkScrollTop])

    return (
        <Flex display={showScroll ? 'flex':'none'} position='fixed' right="17.5%" bottom="15%" >
            <Button onClick={scrollTop} variant="unstyled" transform="scale(1.8)" _hover={{color: "wipit"}} _focus={{boxShadow:"none"}}>
                <Icon  boxSize={4} m={1} as={FaArrowCircleUp} />
            </Button>
        </Flex>
    )
}
