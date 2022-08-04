import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const Page = ({ text }) => {
  return (
    <Center h="full" p="5">
      <Box>
        {/* <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" /> */}
        <Text fontWeight="bold">{text}</Text>
      </Box>
    </Center>
  );
};

export default Page;
