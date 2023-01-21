import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import AuthApi from "../api/auth";
import { useAuth } from "../auth-context/auth.context";
// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link as RouteLink, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(null);
  const handleClick = () => setShow(!show);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // navigate('/dashboard');
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
    if (formData.password.length < 6) {
      return toast({
        title: "Error!",
        description: "Password must be at least 6 characters.",
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
        // if(response.data.success) {
        // navigate('/dashboard');
        toast({
          title: "Login Successfully.",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return setProfile(response);
        // }
        // else {
        //   setError(response.data.msg)
        // }
      })
      .catch((error) => {
        if (error.response) {
          toast({
            title: "Error!",
            description: error.response.data.msg,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          // return setError(error.response.data.msg);
        }
        // return setError("There has been an error.");
      });
  };

  const setProfile = (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return navigate("/dashboard");
  };

  const titleColor = useColorModeValue("teal.300", "teal.200");
  //   const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      direction="column"
      w="100%"
      background="transparent"
      p="48px"
      mt={{ md: "150px", lg: "80px" }}
    >
      <Heading color={titleColor} fontSize="32px" mb="10px">
        Welcome Back
      </Heading>
      <Text
        mb="36px"
        ms="4px"
        color={textColor}
        fontWeight="bold"
        fontSize="14px"
      >
        add your credentials
      </Text>
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
        {/* <FormControl display='flex' alignItems='center'>
        <Route id='remember-login' colorScheme='teal' me='10px' />
        <FormLabel
          htmlFor='remember-login'
          mb='0'
          ms='1'
          fontWeight='normal'>
          Remember me
        </FormLabel>
      </FormControl> */}
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="0px"
        >
          <Text color="red" marginTop="10px" fontWeight="medium">
            {error}
          </Text>
        </Flex>
        <Button
          onClick={handleSubmit}
          fontSize="10px"
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
      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        maxW="100%"
        mt="0px"
      >
        <Text color={textColor} fontWeight="medium">
          Don't have an account?
        </Text>
        <RouteLink to="/SignUp">
          <Text fontWeight="medium" ms="4px">
            <Link>Sign Up</Link>
          </Text>
        </RouteLink>
      </Flex>
    </Flex>
  );
}

export default SignIn;
