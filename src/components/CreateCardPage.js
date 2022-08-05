import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Flex,
  useToast
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import History from "./History";
import axios from "axios";

const CreateCardPage = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formJSON, setFormJSON] = useState({
    for: "",
    cards: [
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" }
    ],
    bgCard: "",
    bgCode: "#000000"
  });

  const cardChangeHandler = (e, cardIndex) => {
    const newFormJSON = { ...formJSON };
    let newCards = [...formJSON.cards];
    newCards[cardIndex].card = e.target.value;
    newFormJSON.cards = newCards;
    setFormJSON(newFormJSON);
  };
  const addCardHandler = () => {
    let currentCount = formJSON.cards.length;
    currentCount = currentCount + 1;
    if (currentCount > 10) {
      toast({
        description: "Cards should not more than 10",
        status: "error",
        duration: 3000,
        position: "top"
      });
    } else {
      const newFormJSON = { ...formJSON };
      let newCards = [...formJSON.cards];
      newCards.push({ card: "" });
      newFormJSON.cards = newCards;
      setFormJSON(newFormJSON);
    }
  };

  const removeCardHandler = () => {
    let currentCount = formJSON.cards.length;
    currentCount = currentCount - 1;
    console.log(currentCount);
    if (currentCount < 6) {
      toast({
        description: "Cards should not less than 6",
        status: "error",
        duration: 3000,
        position: "top"
      });
    } else {
      const newFormJSON = { ...formJSON };
      let newCards = [...formJSON.cards];
      newCards.pop();
      newFormJSON.cards = newCards;
      setFormJSON(newFormJSON);
    }
  };

  const forChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.for = e.target.value;
    setFormJSON(newFormJSON);
  };

  const bgCardChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.bgCard = e.target.value;
    setFormJSON(newFormJSON);
  };

  const bgCodeChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.bgCode = e.target.value;
    setFormJSON(newFormJSON);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(formJSON);
    try {
      setIsLoading(true);
      const {
        data
      } = await axios.post(
        `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/create-card`,
        { ...formJSON }
      );
      // console.log(data.card._id);
      toast({
        description: "Cool 😁 Your Card Saved Succesfully",
        status: "success",
        duration: 3000,
        position: "top"
      });
      History.push(`/for/${data.card._id}`);
    } catch (error) {
      console.error(error);
      toast({
        description: "Somehow Your Card Can't Submitted 😥",
        status: "error",
        duration: 3000,
        position: "top"
      });
      setIsLoading(false);
    }
  };

  return (
    <Box bg="lightblue">
      <Container p="4">
        <Text align="center" fontSize="2xl" mb="4">
          Create Your Card 😊
        </Text>
        <Box p="4" bg="white" rounded="lg" shadow="md">
          <form onSubmit={(e) => submitHandler(e)}>
            <FormControl id="for" isRequired>
              <FormLabel>For ?</FormLabel>
              <Input
                autoComplete="off"
                variant="outline"
                onChange={forChangeHandler}
                placeholder="Someone 🤩"
              />
            </FormControl>
            <FormControl mt="4" isRequired>
              <Flex justify="space-between" mb="2">
                <FormLabel>Card</FormLabel>
                <Box>
                  <IconButton
                    size="sm"
                    colorScheme="green"
                    icon={<AddIcon />}
                    onClick={() => addCardHandler()}
                  />
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    ml="2"
                    icon={<MinusIcon />}
                    onClick={() => removeCardHandler()}
                  />
                </Box>
              </Flex>
              <SimpleGrid columns={1} spacing={2}>
                {formJSON.cards.map(({ card }, i) => (
                  <Textarea
                    minLength="10"
                    maxLength="100"
                    key={i}
                    required={true}
                    variant="outline"
                    roundedTopStart="none"
                    placeholder={"Input Card #" + (i + 1)}
                    onChange={(e) => cardChangeHandler(e, i)}
                  />
                ))}
              </SimpleGrid>
            </FormControl>
            <FormControl mt="4" id="bg-card" isRequired>
              <FormLabel>Image Card URL</FormLabel>
              <Input
                autoComplete="off"
                variant="outline"
                type="url"
                onChange={bgCardChangeHandler}
                placeholder="Paste your image url here 😎"
              />
            </FormControl>
            <FormControl mt="4" id="bg-code">
              <FormLabel>Background Color</FormLabel>
              <Input
                variant="outline"
                onChange={bgCodeChangeHandler}
                type="color"
              />
            </FormControl>
            {isLoading ? (
              <Button
                size="md"
                w="full"
                mt="12"
                colorScheme="teal"
                variant="solid"
                disabled
              >
                Submitting...
              </Button>
            ) : (
              <Button
                size="md"
                type="submit"
                w="full"
                mt="12"
                colorScheme="teal"
                variant="solid"
              >
                Simpan
              </Button>
            )}
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateCardPage;
