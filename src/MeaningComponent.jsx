import { Box, Flex, ListItem, Spacer, UnorderedList,Text } from '@chakra-ui/react'
import React from 'react'
import _ from "lodash";
import PlayIcon from './assets/images/PlayIcon';

function MeaningComponent({ meaning, darkMode ,fontFamily}) {
    let phoneticAudio = undefined;
    let word = undefined;
    let phonetic = undefined;
    let meanings = [];
    if(meaning.length > 0 && !_.has(meaning,"title")){
        word = meaning[0].word;
        phonetic = meaning[0].phonetic;
        meaning.forEach(element => {
            if(element.phonetics.length > 0 ){
                element.phonetics.forEach(p=>{
                    if(p.audio!==""){
                        phoneticAudio = p.audio;
                    }
                })
            }
            element.meanings.forEach(m=>{
                meanings.push(m)
            })
        });
    }
        return (
            <Flex
            direction={"column"} 
            fontFamily={fontFamily}>
                {!_.has(meaning,"title")
                 ? 
                <>
                <Flex alignItems={"center"}>
                    <Flex direction={"column"}>
                        <Box fontSize={"32px"}    
                            fontWeight={700}
                            fontFamily={fontFamily}
                            >
                                {meaning[0].word}
                        </Box>
                        <Box color={"purple.900"}
                        fontSize={"sm"}
                        fontWeight={"400"}
                        fontFamily={fontFamily}>
                            {meaning[0].phonetic}
                        </Box>
                    </Flex>
                    <Spacer />
                    <Box>
                        <PlayIcon size={"48px"}/>
                    </Box>
                </Flex>
                {meanings.map(m=>{
                    return <>
                    <Box>
                        <Flex alignItems={"center"} gap={"25px"}>
                            <Box fontWeight={700}
                            fontSize={"sm"}>{m.partOfSpeech}</Box>
                            <Box height={"1px"} bgColor={"gray.600"} 
                            flexGrow={1}></Box>
                        </Flex>
                        <Box>
                            <Box fontSize={"xs"}
                            fontWeight={"400"}
                            color={"gray.700"}
                            >Meaning</Box>
                            <UnorderedList listStyleType={"none"}>
                                {m.definitions.map(d=>{
                                return <ListItem 
                                fontSize={"15px"} 
                                fontWeight={400}
                                _before={
                                    {
                                    color:"purple.900",
                                    fontWeight:"bold",
                                    display:"inline-block",
                                    width:"15px",
                                }}>{d.definition}<br/>{_.has(d,"example") && <Box color={"gray.700"} fontSize={"xs"} fontWeight={"400"}>"{d.example}"</Box>} </ListItem>
                                })}
                            </UnorderedList>
                        </Box>
                        {(_.has(m,"synonyms") && m.synonyms.length > 0 )  &&
                        <Flex fontSize={"20px"} gap={"5px"} alignItems={"center"} flexWrap={"wrap"}>
                            <Text  color={"gray.700"} fontWeight={"400"}>Synonyms</Text><Text flex={"1 1 auto"} fontWeight={"700"} color={"purple.900"}>{_.join(m.synonyms)}</Text> 
                        </Flex>
                        }
                    </Box>
                    </>
                })}
                </>
                : <Box textAlign={"center"}>
                    <Text>😕</Text>
                    <Text>No Definitions Found</Text>
                    <Text>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</Text>
                </Box>
                }
            </Flex>
        )
    }

    export default MeaningComponent