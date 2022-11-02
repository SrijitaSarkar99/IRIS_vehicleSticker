import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import {ContextProvider} from "../src/context"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </ContextProvider>
    
  </React.StrictMode>
);
