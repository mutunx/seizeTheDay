import React from 'react';
import {Text} from "@chakra-ui/react";

function ToggleText(props) {
    const {set,state} = props;

    return (
        <Text
            fontSize='lg'
            fontWeight={'1000'}
            color={state ? 'black' : 'gray.300'}
            onClick={() => set(!state)}
            userSelect={'none'}
        >
            {props.children}
        </Text>
    );
}

export default ToggleText;
