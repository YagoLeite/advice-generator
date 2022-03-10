import React, { useState, useEffect } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import dividerDesktop from "../styles/images/pattern-divider-desktop.svg";
import diceIcon from "../styles/images/icon-dice.svg";

const Wrapper = () => {
  const [touched, setTouched] = useState(false);
  const [className, setClassName] = useState("");
  const [nextFetch, setNextFetch] = useState(1);
  const [loadedData, setLoadedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setClassName("rotate");
    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) =>
        setTimeout(() => {
          setLoadedData(data);
        }, 3000)
      )
      .catch((error) => setError(error));

    setTouched(true);
    setTimeout(() => {
      setClassName("");
      setTouched(false);
    }, 4000);
  }, [nextFetch]);

  return (
    <VStack
      position="relative"
      justifyContent="center"
      alignItems="center"
      bg="hsl(217, 19%, 24%)"
      w="80%"
      maxW="550px"
      h="fit-content"
      minH="300px"
      borderRadius="15px"
    >
      <Flex color="hsl(150, 100%, 66%)">
        <Text>ADVICE #</Text>
        <Text textAlign="center">{loadedData?.slip.id}</Text>
      </Flex>
      <Text
        fontSize={["20px", "24px", "28px"]}
        maxW="95%"
        textAlign="center"
        pb="6%"
      >
        "{loadedData?.slip.advice}"
      </Text>
      {/* <Flex
        position="absolute"
        bottom="15%"
        justifyContent="center"
        alignItems={"center"}
        objectFit="cover"
      >
        <Image src={test} />
      </Flex> */}
      <Flex position={"absolute"} maxW="80%" bottom="15%" pb="3%">
        <Image src={dividerDesktop} />
      </Flex>
      <Flex
        onClick={() => {
          if (!touched) setNextFetch((prev) => prev + 1);
        }}
        className={className}
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
