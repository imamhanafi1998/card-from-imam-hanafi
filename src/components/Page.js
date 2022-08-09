import React from "react";
import { Box, Center, Text, Image } from "@chakra-ui/react";

const Page = ({
  text = "Empty",
  image = "",
  oppacity = 0.3,
  text_color = "black",
  bg_box = "lightblue"
}) => {
  return (
    <Center
      h="full"
      p="5"
      className="card-container-inside"
      rounded="xl"
      boxShadow="dark-lg"
    >
      <Box>
        <Image
          rounded="xl"
          draggable={false}
          className="card-image-inside"
          src={image}
          alt="broken_image"
          opacity={oppacity}
        ></Image>
        <Box bg={bg_box} p="2" rounded="lg">
          <Text color={text_color} fontWeight="bold">
            {text}
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Page;
