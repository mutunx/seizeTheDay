import React, {useEffect} from 'react';
import { getStepsSync,  setStepsSync} from "./api";
import {
    Button,
    Input,
    Flex,
    InputGroup,
    InputRightElement,
    Textarea,
    Kbd,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box
} from "@chakra-ui/react";

function StepCollection(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {setUpdateSign} = props;
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const textAreaRef = React.useRef(null);
    const inputRef = React.useRef(null);
    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const createStep = (title,description) => {
        const date = new Date();
        const hour = date.getHours();
        return {
            id: Date.now(), // unique id for the object
            date_utc: date.toUTCString(),
            hour: date.getHours().toString().padStart(2, '0') +":00",
            hms: date.getHours().toString().padStart(2, '0')+ ":"+date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0'),
            meridiem: (hour >= 12) ? "PM" : "AM",
            title: title,
            description: description
        };
    }
    const clickHandler = async () => {
        if (title === '' && description === '') return;
        const steps = await getStepsSync();
        const newStep = createStep(title, description);
        steps.push(newStep);
        await setStepsSync(steps);
        setUpdateSign(newStep.id);
        setTitle('');
        setDescription('');
        onClose();
    }
    async function handleKeyDown(event) {
        const tagName = event.target.nodeName.toLowerCase();
        if (event.key === 'Enter' && event.shiftKey && tagName !== 'body') {
            event.preventDefault();
            await clickHandler();
        }
        if (event.key === 'Enter' && tagName === 'input' ) {
            event.preventDefault();
            textAreaRef.current.focus();
        }
        if (event.key === 'i' && tagName === 'body') {
            event.preventDefault();
            onOpen();
            inputRef.current && inputRef.current.focus();
        }
    }



    return (
        <Flex position={'relative'} flexDirection={'column'} minW={'65%'} justifyContent={'center'}>

            <Flex
                alignItems={'center'}
                onClick={onOpen}
                width={'100%'}
                minH={'3rem'}
                border={'1px solid #E2E8F0'}
                fontSize={'large'}
                borderRadius={'8px'}
                padding={'0 1rem'}
                color={'gray.500'}
            >
                Press "i" to type ...
            </Flex>

            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent  maxW={'70rem'}>
                    <ModalBody padding={'0'}>
                        <InputGroup>
                            <Input
                                size={'lg'}
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                                onInput={e=>setTitle(e.target.value)}
                                placeholder='Press "i" to input'
                                value={title}
                                borderRadius={'8px 8px 0 0'}
                            />
                            <InputRightElement
                                minW={'30%'}
                                justifyContent={'flex-end'}
                                pt={'0.5rem'}
                                pr={'0.5rem'}
                                alignItems={'center'}
                            >
                                <Kbd>Enter</Kbd>
                            </InputRightElement>
                        </InputGroup>
                        <Textarea
                            size={'lg'}
                            ref={textAreaRef}
                            placeholder={'Here is a sample placeholder'}
                            resize={'none'}
                            onChange={e=>setDescription(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={description}
                            minH={'15rem'}
                            borderRadius={'0 0 8px 8px'}
                        />
                        <Box  position={'absolute'} bottom={'5%'} right={'1%'}>
                            <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd>
                            <Button size={'sm'} ml={'1rem'} onClick={clickHandler}>
                                submit
                            </Button>
                        </Box>
                    </ModalBody>


                </ModalContent>
            </Modal>

        </Flex>
    );
}

export default StepCollection;
