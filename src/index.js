// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <ChakraProvider>
    <App />
  </ChakraProvider>
  // </StrictMode>
);
