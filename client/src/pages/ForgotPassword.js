// import React from 'react'
// import { FormControl, FormLabel, Input, Button, Stack, Box, Text } from '@chakra-ui/react';
// import { useState } from 'react';
// import { useForm } from "react-hook-form"; 

// function ForgotPassword() {
//     const [email, setEmail] = useState("");
//     const { handleSubmit, errors, register } = useForm();
//     const handleForgotPassword = async () => {
       
//       };
//   return (
//     <Stack>
//     <Box>
//         <form onSubmit={handleSubmit(handleForgotPassword)}>
//             <FormControl>
//                 <FormLabel htmlFor="email">Email</FormLabel>
//                 <Input 
//                     type="email" 
//                     id="email" 
//                     name="email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     ref={register({
//                         required: "Email is required",
//                         pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "Invalid email address"
//                         }
//                     })}
//                 />
//                 {errors.email && <Text color="red.500">{errors.email.message}</Text>}
//             </FormControl>
//             <Button mt={4} variantColor="teal" type="submit" >
//                 Send Password Reset Email
//             </Button>
//          </form> 
//     </Box>
// </Stack>
//   )
// }

// export default ForgotPassword

import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Icon, Button, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Stack, Text, Toast, useColorMode, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { Link as RouteLink } from "react-router-dom";
import React, { useState } from 'react'
import axios from 'axios';
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';


function ForgotPassword() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const textColor = useColorModeValue("teal.300", "teal.200");
  const titleColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const { colorMode, toggleColorMode } = useColorMode();
  /*For OTP Validation Modal Popup Button*/
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [OTP, setOTP] = React.useState("")
  /***************************************/

  const [show, setShow] = React.useState(null);
  const [showc, setShowC] = React.useState(null);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const handleOTPChange = (OTP) => {
    setOTP(OTP)
  }

  const handleOTPComplete = (OTP) => {
    console.log(OTP)
  }
  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();
    //validate
    if (!email ) {
        return toast({
          title: "Error!",
          description: "Please fill in all fields.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      //check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
        return toast({
          title: "Error!",
          description: "Please enter a valid email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } 

    try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/resetPassword?email=${email}`,
        });
        console.log(response.data);
        setUserDetails(response.data.user_id);
        toast({
            title: "OTP Sent",
            description: "Please check the OTP sent to you on your email",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onOpen()
      }
      catch (error) {
        console.log(error)
         toast({
            title: "Error Occured",
            description:error.response.data.msg,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = {
        "user_id": userDetails,
        "otp_val": OTP,
        "new_password": password
    }
    try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/resetPassword`,
          data: data,
          headers: { "Content-Type": "application/json" },
        });
        toast({
          title: "Password changed.",
          description:response.data.msg,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose()
        setConfirmPassword("")
        setPassword("")
        setOTP("")
    } catch (error) {
        console.log(error);
        toast({
            title: "Error !",
            description:error.response.data.msg,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
  }
}

  return (
<Flex 
align="center" justify='center' minW='100vh' maxW="1000vh"
>
<Modal
        size='xl'
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
          <Box mt={3}>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal" >
          OTP
        </FormLabel>
          <HStack>
    <PinInput size={'md'} value={OTP} onChange={handleOTPChange} onComplete={handleOTPComplete}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
    </PinInput>
</HStack>
</Box>
<Box mt={3}>
<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Enter New Password
        </FormLabel>
        <InputGroup>
          <Input
            borderRadius="15px"
            // mb="36px"
            fontSize="sm"
            id="password"
            type={show ? "text" : "password"}
            placeholder="Your password"
            size="lg"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            
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
        </Box>

        <Box mt={3}>
<FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            borderRadius="15px"
            // mb="36px"
            fontSize="sm"
            id="confirmpPassword"
            type={show ? "text" : "password"}
            placeholder="Your password"
            size="lg"
            onChange={e => setConfirmPassword(e.target.value)}
            name="password"
            value={confirmPassword}
            
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
        </Box>
</FormControl>
          </ModalBody>
         
<ModalFooter>
  <Button colorScheme='teal' mr={3} onClick={handleResetPassword}>
    Submit
  </Button>
  <Button onClick={onClose}>Cancel</Button>
</ModalFooter>
</ModalContent>
</Modal>


      <VStack 
      spacing={'-3rem'}  
      >
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
       Forgot Password?
      </Text>
      <FormControl>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal" >
          Email
        </FormLabel>
        <Input
        
          borderRadius="15px"
          mb="24px"
          fontSize="sm"
          type="email" 
          id="email" 
          name="email"
          value={email}
          placeholder="Your email address"
          size="lg"
          onChange={e => setEmail(e.target.value)}
        />

<Button
          onClick={handleResetPasswordRequest}
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
          Send OTP
        </Button>
        </FormControl>
        <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        maxW="100%"
        mt="0px"
      >
        <Text color={titleColor} fontWeight="medium">
          Already have an account?
        </Text>
        <RouteLink to="/">
          <Text fontWeight="medium" ms="4px" color={textColor}>
            <Link>Sign In</Link>
          </Text>
        </RouteLink>
      </Flex>
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
        <RouteLink to="/SignUp">
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
  )
}

export default ForgotPassword
