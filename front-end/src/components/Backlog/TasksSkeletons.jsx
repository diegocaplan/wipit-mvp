import {Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';

export const TasksSkeletons = ({hidden}) => {
    return (
        <Box px="1vw" bg="transparent" hidden={hidden}>
            <SkeletonCircle size="3vw" />
            <SkeletonText pl="4vw" mt="-5vh" noOfLines={4} spacing="5" w="300px" />
            <SkeletonCircle size="3vw" mt="5vh" />
            <SkeletonText pl="4vw" mt="-5vh" noOfLines={4} spacing="5" w="300px" />
        </Box>
    )
}
