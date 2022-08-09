import React, { useState } from "react";
import { Helmet } from "react-helmet";
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
  useToast,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import PreviewCardPage from "./PreviewCardPage";

import History from "./History";
import axios from "axios";

const CreateCardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formJSON, setFormJSON] = useState({
    for: "",
    forColorBox: "#000000",
    forColorText: "#ffffff",
    cards: [
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" },
      { card: "" }
    ],
    bgCard: "",
    bgCode: "#3f3f3f",
    oppacity: 0.5,
    textColor: "#ffffff",
    bgBox: "#000000"
  });
  const [reversedCards, setReversedCards] = useState([]);

  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const modalCloseHandler = () => {
    toast.closeAll();
    onClose();
  };

  const oppacityChangeHandler = (oppacity) => {
    setSliderValue(oppacity);
    // console.log(oppacity * 0.01);
    const newFormJSON = { ...formJSON };
    newFormJSON.oppacity = oppacity * 0.01;
    setFormJSON(newFormJSON);
  };

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

  const forBoxColorChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.forColorBox = e.target.value;
    setFormJSON(newFormJSON);
  };

  const forTextColorChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.forColorText = e.target.value;
    setFormJSON(newFormJSON);
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

  const textColorChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.textColor = e.target.value;
    setFormJSON(newFormJSON);
  };

  const boxColorChangeHandler = (e) => {
    const newFormJSON = { ...formJSON };
    newFormJSON.bgBox = e.target.value;
    setFormJSON(newFormJSON);
  };

  const previewHandler = async () => {
    let rC = [...formJSON.cards];
    setReversedCards(rC.reverse());
    onOpen();
    // window.open(`/preview/${formJSON}`, "_blank");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const {
        data
      } = await axios.post(
        `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/create-card`,
        { ...formJSON }
      );
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
      <Helmet>
        <title>Create Your Card 😊</title>
      </Helmet>
      <Container p="4">
        <Text align="center" fontSize="2xl" mb="4">
          Create Your Card 😊
        </Text>
        <Box p="4" bg="white" rounded="lg" shadow="md">
          <form onSubmit={(e) => submitHandler(e)}>
            <FormControl id="for" isRequired>
              <FormLabel>For ?</FormLabel>
              <Input
                value={formJSON.for}
                autoComplete="off"
                variant="outline"
                onChange={forChangeHandler}
                placeholder="Someone 🤩"
              />
            </FormControl>
            <FormControl mt="4" id="for-text-color">
              <FormLabel>For Text Color</FormLabel>
              <Input
                value={formJSON.forColorText}
                variant="outline"
                onChange={forTextColorChangeHandler}
                type="color"
              />
            </FormControl>
            <FormControl mt="4" id="for-box-color">
              <FormLabel>For Background Color</FormLabel>
              <Input
                value={formJSON.forColorBox}
                variant="outline"
                onChange={forBoxColorChangeHandler}
                type="color"
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
                    value={formJSON.cards[i].card}
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
            <FormControl mt="4" id="bg-card">
              <FormLabel>Image Card URL</FormLabel>
              <Input
                value={formJSON.bgCard}
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
                value={formJSON.bgCode}
                variant="outline"
                onChange={bgCodeChangeHandler}
                type="color"
              />
            </FormControl>
            <FormControl mt="4" id="oppacity" isRequired>
              <FormLabel>Image Oppacity</FormLabel>
              <Slider
                step={1}
                id="slider"
                defaultValue={5}
                min={0}
                max={100}
                value={formJSON.oppacity * 100}
                colorScheme="teal"
                onChange={(v) => oppacityChangeHandler(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <SliderMark value={5} mt="1" ml="-5" fontSize="sm">
                  Fade
                </SliderMark>
                <SliderMark value={95} mt="1" ml="-3" fontSize="sm">
                  Solid
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="teal.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue}%`}
                >
                  <SliderThumb bg="teal" />
                </Tooltip>
              </Slider>
            </FormControl>
            <FormControl mt="6" id="text-color">
              <FormLabel>Text Card Color</FormLabel>
              <Input
                value={formJSON.textColor}
                variant="outline"
                onChange={textColorChangeHandler}
                type="color"
              />
            </FormControl>
            <FormControl mt="4" id="box-color">
              <FormLabel>Text Box Color</FormLabel>
              <Input
                value={formJSON.bgBox}
                variant="outline"
                onChange={boxColorChangeHandler}
                type="color"
              />
            </FormControl>
            <Button
              size="md"
              w="full"
              mt="12"
              colorScheme="blue"
              variant="solid"
              rightIcon={<ExternalLinkIcon />}
              onClick={() => previewHandler()}
            >
              Preview
            </Button>
            {isLoading ? (
              <Button
                size="md"
                w="full"
                mt="4"
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
                mt="4"
                colorScheme="teal"
                variant="solid"
              >
                Submit
              </Button>
            )}
          </form>
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={() => modalCloseHandler()} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="red">
            <Button
              zIndex="1"
              size="sm"
              colorScheme="red"
              onClick={() => modalCloseHandler()}
            >
              Close
            </Button>
          </ModalHeader>
          <ModalBody>
            <PreviewCardPage json={formJSON} reversedCards={reversedCards} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateCardPage;
