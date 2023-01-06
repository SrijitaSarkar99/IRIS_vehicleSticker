import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import {ContextProvider} from "../src/context"
import { AuthProvider } from "./auth-context/auth.context";
const root = ReactDOM.createRoot(document.getElementById("root"));
let user = localStorage.getItem("user");
user = JSON.parse(user);
root.render(
  <React.StrictMode>
     <AuthProvider userData={user}>
    {/* <ContextProvider> */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
    {/* </ContextProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
