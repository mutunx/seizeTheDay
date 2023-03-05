import React, {useEffect} from 'react';
import {getStepsSync, setStepsSync} from "./api";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Stack,
    StackDivider
} from "@chakra-ui/react";
import ToggleText from "./ToggleText";
import RadioText from "./RadioText";
import Step from "./Step";


function StepManager(props) {
    const orderByOptions = ['NULL', 'HOUR', 'AM/PM'];
    const {updateSign} = props;
    const [showDate, setShowDate] = React.useState(true);
    const [showDesc, setShowDesc] = React.useState(true);
    const [steps, setSteps] = React.useState([]);
    const [orderBy, setOrderBy] = React.useState('NULL');
    useEffect(() => {
        const fetchData = async () => {
            const steps = await getStepsSync();
            setSteps(steps);
        }
        fetchData();
    }, [updateSign])

    const deleteStep = async (id) => {
        const newSteps = steps.filter(step => step.id !== id);
        setSteps(newSteps);
        await setStepsSync(newSteps);
    }

    const copyTextSteps = async () => {
        const steps = await getStepsSync();
        const stepsStr = steps.map(step => {
            const { hms, meridiem, title, description} = step;
            const displayList = [title];
            if (showDesc) {
                displayList.push(description);
            }
            if (showDate) {
                displayList.push(hms+' '+meridiem);
            }
            return displayList.join('\n');
        }).join('\n\n');
        await navigator.clipboard.writeText(stepsStr);
    }
    const copyMdSteps = async () => {
        const steps = await getStepsSync();
        const stepsStr = steps.map(step => {
            let { hms, meridiem, title, description} = step;
            title = `- **${title}**`;
            const displayList = [title];
            if (showDesc) {
                displayList.push(description);
            }
            if (showDate) {
                displayList.push(hms+' '+meridiem);
            }
            return displayList.join('\n');
        }).join('\n\n');
        await navigator.clipboard.writeText(stepsStr);
    }

    return (
        <Card w={'30%'}>
            <CardHeader display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <Heading> </Heading>
                <RadioText set={setOrderBy} defaultSelected={orderBy} options={orderByOptions}/>


            </CardHeader>
            <CardBody>
                {orderBy === 'NULL' &&
                    <Stack h={'20rem'}  overflowY={'auto'} divider={<StackDivider/>} spacing='1'>
                        {steps.map(step =>
                            <Step
                                showDate={showDate}
                                showDesc={showDesc}
                                deleteStep={deleteStep}
                                step={step}
                            />
                        )}
                    </Stack>
                }
                {orderBy === 'AM/PM' &&
                    <Accordion h={'20rem'}  overflowY={'auto'} defaultIndex={[0,1]} allowMultiple>
                        {
                            [...new Set(steps.map(step => step.meridiem))].map(meridiem =>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                {meridiem}
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {steps.filter(step=>step.meridiem === meridiem).map(step =>
                                            <Step
                                                showDate={showDate}
                                                showDesc={showDesc}
                                                deleteStep={deleteStep}
                                                step={step}
                                            />
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            )
                        }
                    </Accordion>
                }
                {orderBy === 'HOUR' &&
                    <Accordion h={'20rem'}  overflowY={'auto'} defaultIndex={[...new Set(steps.map(step => step.hour))].map((a,i)=>i)} allowMultiple>
                        {
                            [...new Set(steps.map(step => step.hour))].map(hour =>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                {hour}
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {steps.filter(step=>step.hour === hour).map(step =>
                                            <Step
                                                showDate={showDate}
                                                showDesc={showDesc}
                                                deleteStep={deleteStep}
                                                step={step}
                                            />
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            )
                        }
                    </Accordion>
                }

            </CardBody>
            <CardHeader display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <HStack>
                    <ToggleText set={setShowDate} state={showDate}>DATE</ToggleText>
                    <ToggleText set={setShowDesc} state={showDesc}>DESC</ToggleText>
                </HStack>
                <HStack>
                    <Button
                        variant={'link'}
                        onClick={copyTextSteps}
                    >
                        TEXT
                    </Button>
                    <Button
                        variant={'link'}
                        onClick={copyMdSteps}
                    >
                        MD
                    </Button>
                </HStack>
            </CardHeader>
        </Card>
    );
}

export default StepManager;
