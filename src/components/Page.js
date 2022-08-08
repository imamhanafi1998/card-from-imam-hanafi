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
    <Center h="full" p="5" className="card-container-inside">
      <Box>
        <Image
          className="card-image-inside"
          src={image}
          alt="Dan Abramov"
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
