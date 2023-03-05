import React from 'react';
import { HStack, Text} from "@chakra-ui/react";

function RadioText(props) {
    const {set,defaultSelected,options} = props;

    const [selected, setSelected] = React.useState(defaultSelected);
    return (
        <HStack>
            {options && options.map(option =>
                <Text
                    fontSize='lg'
                    fontWeight={'1000'}
                    color={selected === option ? 'black' : 'gray.300'}
                    onClick={() => {
                        setSelected(option);
                        set(option);
                    }}
                    userSelect={'none'}
                >
                    {option}
                </Text>
            )}
        </HStack>
    );
}

export default RadioText;
