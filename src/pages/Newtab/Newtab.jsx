import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import Header from "./Header";
import StepCollection from "./StepCollection";
import StepManager from "./StepManager";
import {Divider, Flex, HStack} from "@chakra-ui/react";
import MostViewedPages from "./MostViewedPages";
import Footer from "./Footer";

const Newtab = () => {
    const [updateSign, setUpdateSign] = React.useState(0);
  return (
    <Flex flexDirection={'column'} h={'100vh'} justifyContent={'space-around'} alignItems={'center'}>
        <Header />
        <StepCollection setUpdateSign={setUpdateSign}/>
        <HStack divider={<Divider orientation='vertical' variant="thick" />} minW={'100%'} justifyContent={'center'} spacing={'24px'}>
            <StepManager
                updateSign={updateSign}
            />
            <MostViewedPages />
        </HStack>
        <Footer />
    </Flex>
  );
};

export default Newtab;
