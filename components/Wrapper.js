import React, { useState, useEffect } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import useFetch from "../hook/useFetch";
import Image from "next/image";
import test from "../styles/images/pattern-divider-desktop.svg";
import diceIcon from "../styles/images/icon-dice.svg";

const Wrapper = () => {
  const [touched, setTouched] = useState(false);
  const { loadedData, loading } = useFetch("https://api.adviceslip.com/advice");

  useEffect(() => {
    if (touched) {
      setTimeout(() => {
        console.log("cu");
      }, 1000);
    }

    return () => {
      clearTimeout(() => console.log("oi"));
    };
  }, [touched]);

  return (
    <VStack
      position="relative"
      justifyContent="center"
      alignItems="center"
      bg="hsl(217, 19%, 24%)"
      w="80%"
      maxW="550px"
      h="fit-content"
      borderRadius="15px"
      p="3%"
    >
      <Flex color="hsl(150, 100%, 66%)" py="1%">
        <Text>ADVICE #</Text>
        <Text textAlign="center">{loadedData?.slip.id}</Text>
      </Flex>
      <Text pb="6%">"{loadedData?.slip.advice}"</Text>
      <Image src={test} />
      <Flex
        onClick={() => setTouched(true)}
        className={touched ? "test" : ""}
        position="absolute"
        bottom="-22.5px"
        left="calc(50% - 22.5px)"
        bg="hsl(150, 100%, 66%)"
        borderRadius="50%"
        w="45px"
        h="45px"
        justifyContent={"center"}
        alignItems="center"
        _hover={{ shadow: "0px 0px 20px 10px hsl(150, 100%, 66%)" }}
      >
        <Image src={diceIcon} />
      </Flex>
    </VStack>
  );
};

export default Wrapper;
