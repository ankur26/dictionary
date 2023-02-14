import { Box, Button, Center, ChakraProvider, Container, Divider, Flex, IconButton, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import { theme, fonts } from '../theme'
import LogoIcon from './assets/images/LogoIcon'
import ArrowDownIcon from './assets/images/ArrowDownIcon'
import Moon from './assets/images/Moon'
import SearchIcon from './assets/images/SearchIcon'
import _ from "lodash"
import MeaningComponent from './MeaningComponent'

function App() {

    const [fontValue, setfontValue] = useState("Mono")
    const [darkMode, setDarkMode] = useState(false);
    const [lookupText, setlookupText] = useState("");
    const [meaning,setMeaning] = useState({});
    function toggleDarkMode() {
        setDarkMode(!darkMode)
    }
    async function lookupValue() {
        try {
            let output = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lookupText}`)).json()
            setMeaning(output)
        }
        catch {
            console.log("Some error happened")
        }
    }
    function checkEnterPress(e) {
        if (e.keyCode === 13) {
            lookupValue()
        }
    }
    return (
        <ChakraProvider theme={theme} >
            <Box bgColor={darkMode ? "blackAlpha.700" : "whiteAlpha.700"} mx="auto" height={"100%"}>
                <Container maxW={"750px"}
                    px="24px"
                    py={["24px", "58px"]}
                    color={darkMode ? "whiteAlpha.900" : "blackAlpha.700"}
                    bgColor={darkMode ? "blackAlpha.700" : "whiteAlpha.900"}>
                    <Flex justifyContent={"center"} flexWrap={"nowrap"} fontFamily={fonts[fontValue]}>
                        <Box><LogoIcon /></Box>
                        <Spacer />
                        <Flex alignItems={"center"}>
                            <Box color={darkMode ? "whiteAlpha.900" : "blackAlpha.700"} fontSize={"xs"} fontWeight={"bold"}>
                                {fontValue}
                            </Box>
                            <Box bgColor={darkMode ? "blackAlpha.700" : "whiteAlpha.700"}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            bgColor={darkMode ? "blackAlpha.700" : "whiteAlpha.900"}
                                            _hover={{ bgColor: "inherit" }}
                                        ><ArrowDownIcon /></Button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent
                                            maxW={"180px"}
                                            bgColor={darkMode ? "blackAlpha.700" : "whiteAlpha.900"}
                                            color={darkMode ? "whiteAlpha.900" : "blackAlpha.700"}
                                            borderColor={darkMode ? "purple.900" : "gray.600"}>
                                            <PopoverBody textAlign={["center", "left"]} fontWeight={700}>
                                                <Box
                                                    _hover={{ color: 'purple.900' }}
                                                    fontFamily={`"Inter",sans-serif`}
                                                    onClick={() => setfontValue("Sans Serif")}>
                                                    Sans Serif
                                                </Box>
                                                <Box
                                                    _hover={{ color: 'purple.900' }}
                                                    fontFamily={`"Lora",serif`}
                                                    onClick={() => setfontValue("Serif")}>
                                                    Serif
                                                </Box>
                                                <Box
                                                    _hover={{ color: 'purple.900' }}
                                                    fontFamily={`"Inconsolata",monospace`}
                                                    onClick={() => setfontValue("Mono")}>
                                                    Mono
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </Box>
                        </Flex>
                        <Divider mx={"16px"} h={["32px"]} orientation="vertical" bgColor={"whiteAlpha.900"} />
                        <Flex alignItems={"center"} gap="12px">
                            <Box minH={"20px"}
                                minW={"40px"}
                                borderRadius={"10px"}
                                bgColor={darkMode ? "purple.900" : "gray.700"}
                                py="3px"
                                onClick={toggleDarkMode}
                            >
                                <Box
                                    height={"14px"}
                                    width={"14px"}
                                    bgColor={"whiteAlpha.900"}
                                    borderRadius={"50%"}
                                    ms={darkMode ? "23px" : "3px"}
                                    transition={"margin 0.1s ease-in"}
                                ></Box>

                            </Box>
                            <Box>
                                <Moon darkMode={darkMode} />
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex
                        my="24px"
                        alignItems={"center"}
                        justifyContent={"center"}
                        bgColor={darkMode ? "blackAlpha.600" : "whiteAlpha.800"}
                        borderRadius={"18px"}
                        px="24px"
                        >
                        <Input
                            fontFamily={fonts[fontValue]}
                            p={0}
                            fontWeight={"700"}
                            fontSize={"xs"}
                            outline={"transparent"}
                            border="none"
                            _focusVisible={{
                                border: "none"
                            }}
                            color={darkMode ? "whiteAlpha.900" : "blackAlpha.700"}
                            onKeyDown={checkEnterPress}
                            value={lookupText}
                            onChange={(e) => setlookupText(e.target.value)}
                        ></Input>
                        <Box onClick={lookupValue}
                        _hover={{cursor:"pointer"}}>
                            <SearchIcon />
                        </Box>
                    </Flex>
                    {!_.isEmpty(meaning) && <MeaningComponent meaning={meaning} darkMode={darkMode} fontFamily={fonts[fontValue]}/>}
                </Container>
            </Box>
        </ChakraProvider>
    )
}

export default App