import React from "react";
import { Helmet } from "react-helmet";
import { Box, Center, Image } from "@chakra-ui/react";

const UnknownPage = () => {
  return (
    <Box className="card-container" bg="#b5d4dd">
      <Helmet>
        <title>Card Not Found 😥</title>
      </Helmet>
      <Center>
        <Image src="https://i.pinimg.com/originals/a4/62/d1/a462d192479048db0f02f4466b900e0a.gif" />
      </Center>
    </Box>
  );
};

export default UnknownPage;
