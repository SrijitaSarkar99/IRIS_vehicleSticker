import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import jwt_decode from "jwt-decode"
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Register(){
  const [showPassword, setShowPassword] = useState(false);
  //const [user, setUser] = useState({});
  const {user, setUser} = useUserContext({});
  const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    // console.log(userObject);
    // console.log(user);
    const userStr = JSON.stringify(userObject);
    localStorage.setItem("user",userStr);
  }
    useEffect(() => {
    const userexist = localStorage.getItem("user");
    if(userexist){
      const parseUserData = JSON.parse(userexist);
      setUser(parseUserData);
      return;
    }
    /* global google*/
    google.accounts.id.initialize({
      client_id: "903939650165-arnos8ajp8d0jlr8o18aeroufh3dfpl6.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large",width: "300px",logo_alignment: "center",text_alignment: "center"}
    );
  }, []);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500"/>
        <Heading color="teal.400">Login</Heading>
        <Box maxW={{ base: "100%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Signin with IRIS
              </Button>
              <button
                // borderRadius={0}
                id="signInDiv"
                // class = "btn"
                type="submit"
                // variant="solid"
                // colorScheme="teal"
                // width="100%"
                
              >
                Continue with Google
              </button>
              { user && 
                // <Navigate to="/"/>
                navigate("/")
              }
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};
export default Register;
