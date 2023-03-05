import React from 'react';
import {Box, Heading, IconButton, Text} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

function Step(props) {
    const {step,showDesc,showDate,deleteStep} = props;
    return (
        <Box position={"relative"}  >
            <Heading pb='5' pr='10' size='xs' textTransform='uppercase'>
                {step.title}
            </Heading>
            {showDesc && <Text fontSize='sm' pr='2'>
                {step.description}
            </Text>}
            {showDate && <Text textAlign={'right'} color={'gray.300'}>
                {step.hms} {step.meridiem}
            </Text>}
            <IconButton
                size={'sm'}
                pos={'absolute'}
                right={'5px'}
                top={'2%'}
                aria-label={'delete'}
                variant={'outline'}
                onClick={() => deleteStep(step.id)}
                icon={<DeleteIcon />}
            />
        </Box>
    );
}

export default Step;
