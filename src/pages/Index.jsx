import React, { useState } from "react";
import { Box, Button, Input, Text, VStack, useToast, Center, Square, Heading, Container } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexColor, setHexColor] = useState("");
  const [colorName, setColorName] = useState("");
  const toast = useToast();

  const handleColorSearch = async () => {
    if (!/^([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
      toast({
        title: "Invalid HEX code",
        description: "Please enter a valid HEX color code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`https://api.color.pizza/v1/${hexColor}`);
      const data = await response.json();

      if (data.colors && data.colors.length > 0) {
        setColorName(data.colors[0].name);
      } else {
        setColorName("Unknown color");
      }
    } catch (error) {
      toast({
        title: "Error fetching color",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent py={10}>
      <VStack spacing={5}>
        <Heading mb={4}>HEX Color Translator</Heading>
        <Input placeholder="Enter HEX color code without #" value={hexColor} onChange={(e) => setHexColor(e.target.value)} />
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={handleColorSearch}>
          Translate Color
        </Button>
        {colorName && (
          <Box textAlign="center">
            <Text fontSize="xl" mb={2}>
              Color Name: {colorName}
            </Text>
            <Center>
              <Square size="100px" bg={`#${hexColor}`} border="1px" borderColor="gray.300" />
            </Center>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
