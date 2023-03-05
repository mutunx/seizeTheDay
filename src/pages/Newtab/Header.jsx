import React, {useEffect} from 'react';
import {Badge, Box, Heading} from "@chakra-ui/react";
import dayjs from "dayjs";

function Header() {
    const [dayPercent, setDayPercent] = React.useState(0.0);

    useEffect(()=> {
        const intervalId = setInterval(() => {
            const now = dayjs();
            const m = now.unix();
            const endToday= dayjs().endOf('day').unix();
            const startToday = dayjs().startOf('day').unix();
            let r = (endToday - m) / (endToday - startToday) * 100;
            setDayPercent(r.toFixed(3));
            const titleTop = 1100 - r;
            document.documentElement.style.setProperty('--titleTop', titleTop+'px');
        }, 50);
        return () => clearInterval(intervalId);
    })

    return (
        <Box pos={"relative"}>
            <Heading id={'title'} as='h1' size='4xl' >
                Seize the Day
            </Heading>
            <Badge
                ml='1'
                variant='solid'
                fontSize='0.8em'
                colorScheme='blue'
                pos={'absolute'}
                top={'20px'}
                right={'-80px'}
            >
            {dayPercent}%
            </Badge>
        </Box>
    );
}

export default Header;
