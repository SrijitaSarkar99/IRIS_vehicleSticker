import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import AuthApi from "../api/auth";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function SignUp() {
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode, toggleColorMode } = useColorMode();

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.name === "photo" || e.target.name === "idProof"
          ? e.target.files[0]
          : e.target.value,
    });
    // console.log({ formData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if all fields are filled
    if (invalidInput(formData)) {
      return toast({
        title: "Error Occured",
        description: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    //check if password and confirm password match
    if (formData.password !== formData.Confirmpassword) {
      return toast({
        title: "Error Occured",
        description: "Passwords do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    //check if password length is greater than or equal to 8
    if (formData.password.length < 8) {
      return toast({
        title: "Error Occured",
        description: "Password must be atleast 8 characters long",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    //check if password is strong
    if (!isPasswordStrong(formData.password)) {
      return toast({
        title: "Error Occured",
        description: "Password is not strong enough. It must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
        status: "error",
        duration: 5000,
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

    //check if aadhar is valid
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid Aadhar Number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if mobile is valid
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid Mobile Number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if city is valid
    if (!/^[a-zA-Z]+$/.test(formData.city)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid City.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if state has no numbers it can have spaces
    if (!/^[a-zA-Z ]+$/.test(formData.state)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid State.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if pincode is valid
    if (!/^\d{6}$/.test(formData.pinCode)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid Pincode.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    //check if country is valid
    if (!/^[a-zA-Z]+$/.test(formData.country)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid Country.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    const data = new FormData();
    for (const property in formData) {
      data.append(property, formData[property]);
    }

    AuthApi.Register(data)
      .then((response) => {
        // console.log(response.data);
        toast({
          title: "Account created.",
          description:
            "We've created your account for you. Redirecting to Login Page",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/auth/signin");
        
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          if (error.response.data.err.original.code === "ER_DUP_ENTRY") {
            return toast({
              title: "Error Occured",
              description: "User already exists. Kindly Sign In.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
    
          toast({
            title: "Error Occured",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  useEffect(() => {
    AuthApi.GETALLDEPARTMENTS()
      .then((response) => {
        // console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
        }
        
      });
  }, []);

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Flex justifyContent={'flex-end'} minW='full'>
      <Button  onClick={toggleColorMode} variant='unstyled'>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>

    <Flex align="center" justify="center" >
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
      {/* <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "auto" }}
      ></Box> */}
      {/* <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="2rem"
        mb="30px"
      >
        <Text fontSize="4xl" color={textColor} fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Vehicle Sticker Registration
        </Text>
      </Flex> */}
      <Flex alignItems="center" justifyContent="center" mb="4vh" mt="0px">
        {/* {user && user.token ? ( */}
        {/* <Text
          fontSize='xl'
          color={textColor}
          fontWeight='bold'
          textAlign='center'
          mb='22px'>
            You are already signed in.
        </Text>
      ) : ( */}
        <Box
          // direction="column"
          // w="800px"
          background="transparent"
          borderRadius="10px"
          p="40px"
          w='half'
          // mx={{ base: "100px" }}
          // bg={bgColor}
          // boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="10px"
          >
            Registration Form
          </Text>
          <Heading
    size={'sm'}
    color={titleColor}
    mt='1rem'
    mb={'2rem'}
    >
      Personal Details
    </Heading>
          <FormControl>
            <HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Name
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              id="name  "
              placeholder="Your full name"
              mb="24px"
              size="lg"
              name="name"
              onChange={handleChange}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="email"
              type="email"
              placeholder="Your email address"
              mb="24px"
              size="lg"
              name="email"
              onChange={handleChange}
            />
            </HStack>
            <HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="password"
              type="password"
              placeholder="Enter password"
              mb="24px"
              size="lg"
              name="password"
              onChange={handleChange}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Confirm Password
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="confirmpassword"
              type="password"
              placeholder="Enter password again"
              mb="24px"
              size="lg"
              name="Confirmpassword"
              onChange={handleChange}
            />
</HStack>
<HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Aadhar Number
            </FormLabel>
            <Input
              fontSize="sm"
              maxLength="12"
              ms="4px"
              borderRadius="15px"
              id="aadhar"
              type="number"
              placeholder="12 digit Aadhar Number"
              mb="24px"
              size="lg"
              name="aadharNumber"
              onChange={handleChange}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Contact Number
            </FormLabel>
            <Input
              fontSize="sm"
              id="phone"
              ms="4px"
              borderRadius="15px"
              type="number"
              placeholder="10 digit Phone Number"
              mb="24px"
              size="lg"
              name="mobileNumber"
              maxLength={10}
              onChange={handleChange}
            />
</HStack>
<HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Type of applicant
            </FormLabel>
            <Select
              fontSize="sm"
              ms="4px"
              id="type"
              borderRadius="15px"
              placeholder="Select your type"
              mb="24px"
              size="lg"
              name="type"
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Non-academic staff">Non-academic staff</option>
            </Select>

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Department
            </FormLabel>

            <Select
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="department"
              placeholder="Select your department"
              mb="24px"
              size="lg"
              name="department"
              onChange={handleChange}
            >
              {departments.map((departments) => (
                <option value={departments.d_name}>{departments.d_name}</option>
              ))}
            </Select>
            </HStack>
<HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Gender
            </FormLabel>
            <Select
              fontSize="sm"
              w={'48vh'}
              ms="4px"
              borderRadius="15px"
              placeholder="Select your gender"
              mb="24px"
              id="gender"
              size="lg"
              name="gender"
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            </HStack>
            <HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Upload your Picture
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="picture"
              type="file"
              accept="image/*"
              pt={2}
              mb="24px"
              size="lg"
              name="photo"
              onChange={handleChange}
            />
            
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Upload your Id proof
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              id="idproof"
              borderRadius="15px"
              type="file"
              accept="image/*"
              pt={2}
              mb="24px"
              size="lg"
              name="idProof"
              onChange={handleChange}
            />
</HStack>
            <Divider/>
    <Heading
    size={'sm'}
    color={titleColor}
    mt='1rem'
    mb={'2rem'}
    >
      Permanent Address 
    </Heading>
            {/* <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Address
            </FormLabel> */}
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              id="address"
              placeholder="Address Line 1"
              mb="24px"
              size="lg"
              name="addressLine1"
              onChange={handleChange}
              // TODO: to be set
            />

            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Address Line 2"
              mb="24px"
              size="lg"
              name="addressLine2"
              onChange={handleChange}
            />
<HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              City
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="city"
              type="text"
              mb="24px"
              size="lg"
              name="city"
              onChange={handleChange}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              State
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="state"
              type="text"
              mb="24px"
              size="lg"
              name="state"
              onChange={handleChange}
            />
            </HStack>
<HStack mb={'3vh'}>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Country
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="country"
              type="text"
              mb="24px"
              size="lg"
              name="country"
              onChange={handleChange}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Pincode
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="pinCode"
              type="number"
              mb="24px"
              size="lg"
              name="pinCode"
              onChange={handleChange}
            />
</HStack>

<Divider/>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color="red" marginBottom="15px" fontWeight="medium">
                {/* {error} */}
              </Text>
            </Flex>
            <Flex justifyContent={'center'}>
            <Button
              // onClick={handleSubmit}
              type="submit"
              bg="teal.300"
              fontSize="10px"
              color="white"
              fontWeight="bold"
              w="25%"
              h="45"
              mb="24px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              SIGN UP
            </Button>
            </Flex>
          </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <RouteLink to="/auth/signin">
                <Link
                  color={titleColor}
                  ms="5px"
                  // href="/"
                  fontWeight="bold"
                >
                  Sign In
                </Link>
              </RouteLink>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;

function invalidInput(formData) {
  return (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.Confirmpassword ||
    !formData.aadharNumber ||
    !formData.mobileNumber ||
    !formData.department ||
    !formData.addressLine1 ||
    !formData.city ||
    !formData.state ||
    !formData.pinCode ||
    !formData.country ||
    !formData.photo ||
    !formData.idProof
  );
}

function isPasswordStrong(password) {
  //check if password is strong
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);
}
