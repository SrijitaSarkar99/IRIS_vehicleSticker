import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
// Custom components
import AuthApi from "../api/auth";
import { useAuth } from "../auth-context/auth.context";
// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  // Chakra color mode
  const textColor = useColorModeValue("teal.300", "teal.200");
  const titleColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = React.useState(null);
  const handleClick = () => setShow(!show);
  // const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate
    if (!formData.email || !formData.password) {
      return toast({
        title: "Error!",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if password is at least 6 characters
    if (formData.password.length < 8) {
      return toast({
        title: "Error!",
        description: "Invalid Credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if password is strong or not
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
        formData.password
      )
    ) {
      return toast({
        title: "Error!",
        description: "Invalid Credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if email is valid
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    AuthApi.Login(formData)
      .then((response) => {
        // console.log(response.status)
        if(response.status=="200") {
        // navigate('/dashboard');
        toast({
          title: "Login Successfully.",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return setProfile(response);}
        
      })
      .catch((error) => {
        if (error.response) {
          toast({
            title: "Error!",
            // description: error.response.data.msg,
            description: "Invalid Credentials.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const setProfile = (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return navigate("/vehicles");
  };

  

  return (
    <Flex>
      <VStack spacing={'-3rem'}>
      <Flex justifyContent={'flex-end'} minW='full'>
      <Button  onClick={toggleColorMode} variant='unstyled'>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      <HStack>
    <Flex align="center" justify="center" minH="100vh" minW="100vh">
      <Stack>
      <HStack>
      <Image
            src="https://cdn.iris.nitk.ac.in//svg/emblem-compressed.svg"
            alt="logo of National Institute of Technology Karnataka"
            height="3.5rem"
            marginRight="10px"
          />
      <Heading color={titleColor} mb="10px" fontSize="32px">NITK Surathkal</Heading>
      </HStack>
      <Text color={textColor} fontSize="28px" pl="80px" >
        Vehicle Sticker Registration Module
      </Text>
      </Stack>
      </Flex>
    
    <Flex align="center" justify="center" minH="100vh" minW="100vh">
      
      <Box p={8} borderWidth="1px" rounded="lg" boxShadow="lg" minW='50vh' bgColor={'whiteAlpha.100'}>
      
      <Text
        mb="36px"
        ms="4px"
        color={textColor}
        fontWeight="bold"
        fontSize="24px"
      >
       Sign In
      </Text>
      <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Email
        </FormLabel>
        <Input
          borderRadius="15px"
          mb="24px"
          fontSize="sm"
          id="email"
          type="text"
          placeholder="Your email adress"
          size="lg"
          onChange={handleChange}
          name="email"
          value={formData?.email}
        />
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            borderRadius="15px"
            mb="36px"
            fontSize="sm"
            id="password"
            type={show ? "text" : "password"}
            placeholder="Your password"
            size="lg"
            onChange={handleChange}
            name="password"
            value={formData?.password}
            
          />

          <InputRightElement display="flex" alignItems="center" mt="4px">
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: "pointer" }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
<Flex justifyContent={'flex-end'}>
              <Link color="blue.500" fontSize="sm" href="../auth/forgot-password">
              Forgot Password?
            </Link>
            </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="0px"
        >
          {/* <Text color="red" marginTop="10px" fontWeight="medium">
            {error}
          </Text> */}
        </Flex>

        <Button
          // onClick={handleSubmit}
          fontSize="14px"
          type="submit"
          bg="teal.300"
          w="100%"
          h="45"
          mb="20px"
          color="white"
          
          mt="20px"
          _hover={{
            bg: "teal.200",
          }}
          _active={{
            bg: "teal.400",
          }}
        >
          SIGN IN
        </Button>
      </FormControl>
      </form>
      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        maxW="100%"
        mt="0px"
      >
        <Text color={titleColor} fontWeight="medium">
          Don't have an account?
        </Text>
        <RouteLink to="/auth/signup">
          <Text fontWeight="medium" ms="4px" color={textColor}>
            <Link>Sign Up</Link>
          </Text>
        </RouteLink>
      </Flex>
      </Box>
    </Flex>
    </HStack>
    </VStack>
    </Flex>
  );
}

export default SignIn;
