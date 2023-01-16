import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
// import { HSeparator } from "components/separator/Separator";
import AuthApi from "../api/auth";

import { useAuth } from "../auth-context/auth.context";
// import DefaultAuth from "../layouts/auth/Default";
// Assets
import illustration from "../asset/bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, Navigate, NavLink, Route, useNavigate, useNavigation } from "react-router-dom";
import { Switch } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });
  // Chakra color mode
  const navigate = useNavigate();
  const toast=useToast();
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
  // const history = useHistory();
  const { user, setUser } = useAuth();
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

   const handleSubmit =e => {
    // navigate('/dashboard');
    e.preventDefault();
    AuthApi.Login(formData).then(response => {
        // console.log(response.data);
        // navigate('/dashboard');
        // toast({
        //     title: 'Login Successfully.',
        //     description: "",
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
      // if(response.data.success) {
        // if(response.status==200) {
          navigate('/dashboard');
        toast({
            title: 'Login Successfully.',
            description: "",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        return (setProfile(response));
      // } 
      // else {
      //   setError(response.data.msg)
      // }
    }).catch(error => {
      if (error.response) {
        return setError(error.response.data.msg);
      }
      return setError("There has been an error.");
    })
  }

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
    direction='column'
    w='100%'
    background='transparent'
    p='48px'
    mt={{ md: "150px", lg: "80px" }}>
    <Heading color={titleColor} fontSize='32px' mb='10px'>
      Welcome Back
    </Heading>
    <Text
      mb='36px'
      ms='4px'
      color={textColor}
      fontWeight='bold'
      fontSize='14px'>
      add your credentials
    </Text>
    <FormControl>
      <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
        Email
      </FormLabel>
      <Input
        borderRadius='15px'
        mb='24px'
        fontSize='sm'
        id='email'
        type='text'
        placeholder='Your email adress'
        size='lg'
        onChange={handleChange}
        name="email"
        value={formData?.email}
      />
      <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
        Password
      </FormLabel>
      <InputGroup>
      <Input
        borderRadius='15px'
        mb='36px'
        fontSize='sm'
        id='password'
        type={show ? "text" : "password"}
        placeholder='Your password'
        size='lg'
        onChange={handleChange}
        name="password"
        value={formData?.password}
      />

<InputRightElement display='flex' alignItems='center' mt='4px'>
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
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        maxW='100%'
        mt='0px'>
        <Text color="red" marginTop="10px" fontWeight='medium'>
          {error}
        </Text>
      </Flex>
      <Button
        onClick={handleSubmit}
        fontSize='10px'
        type='submit'
        bg='teal.300'
        w='100%'
        h='45'
        mb='20px'
        color='white'
        mt='20px'
        _hover={{
          bg: "teal.200",
        }}
        _active={{
          bg: "teal.400",
        }}>
        SIGN IN
      </Button>
    </FormControl>
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      maxW='100%'
      mt='0px'>
      <Text color={textColor} fontWeight='medium' >
        Don't have an account?
        <Link color={titleColor} ms='5px' 
        href='/SignUp' fontWeight='bold'>
          Sign Up
        </Link>
      </Text>
    </Flex>
  </Flex>
  );
}

export default SignIn;