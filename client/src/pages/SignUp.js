
import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  // Icon,
  Input,
  Link,
  Select,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import HomeNav from "../components/HomeNav"
import axios from "axios"
import AuthApi from "../api/auth"
import { useAuth } from "../auth-context/auth.context"
function SignUp() {
  const [formData, setFormData] = useState({})


  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const toast=useToast();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");

    const handleChange = e => {
      setFormData({
        ...formData,
        [e.target.name]:(e.target.name==="photo" || e.target.name==="idProof") ? e.target.files[0]: e.target.value
      })
    }
    
    const handleSubmit =async (e) => {
//       if(!name || !email || !password || !confirmpassword || !aadhaar || !mobile || !type || !department || !addressline1 || !city ||!state ||!country ||!gender )
//       {
//         toast({
//           title: "Please Fill All Fields",
//           status:"warning",
//           duration:"5000",
//           isClosable: true,
//           position:"bottom"
//         })
//       }

      if(e.target.password !== e.target.confirmpassword)
      {
        toast({
          title: "Passwords Do Not Match",
          status:"warning",
          duration:"5000",
          isClosable: true,
          position:"bottom"
        })
      }
//       try {
//         const config = {
//           headers:{
//             "Content-type": "application/json",
//           },
//         };
//         const { data } = await axios.post("localhost:5000/signup",{email,name,aadhaar,mobile,department,pincode,country
//           ,gender,type,password, },config)
//         toast({
//           title: 'Account created.',
//           description: "We've created your account for you.",
//           status: 'success',
//           duration: 9000,
//           isClosable: true,
//         });
// history.push("/Dashboard");
//         localStorage.setItem('userInfo',JSON.stringify(data))
//       } catch (error) {
//         toast({
//           title: 'Error Occured!',
//           description: error.response.data.message,
//           status: 'error',
//           duration: 9000,
//           isClosable: true,
//         });
//       }
        // const data = new FormData(formData)
       
        // TODO: Add later
        // console.log(formData)
      //   e.preventDefault();
      //   const data = new FormData();
      // for (const property in formData) {
      //   data.append(property, formData[property]);
      // }
      //   // AuthApi.Register(formData).then(response => {
      //   AuthApi.Register(data).then(response => {
      //     history("/");
      //     if(response.data.success) {
            
      //       return history("/");
      //     } else {
      //       setError(response.data.msg)
      //     }
      //   }).catch(error => {
      //     if (error.response) {
      //       return setError(error.response.data.msg);
      //     }
      //     return setError("There has been an error.");
      //   })


      e.preventDefault();
      const data = new FormData();
      for (const property in formData) {
        data.append(property, formData[property]);
      }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/signup`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast({
                  title: 'Account created.',
                  description: "We've created your account for you. Redirecting to Login Page",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                navigate('/');
    } catch(error) {
      toast({
                  title: 'Error Occured!',
                  description: error.response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                console.log(error.response)
    }
      }

// TODO: Implement backend route to send all departments without authorization
      // useEffect(() => {
      //   async function fetchData(){
      //   try {
      //     const response = await axios({
      //       method: "get",
      //       url: `http://localhost:5000/departments?pageNo=${1}`

      //     }); 
      //     console.log(response.data);
      //      setDepartments(response.data);
      //   } 
      //   catch(error) {
      //     console.log(error);
      //   }
      //   }
      //   fetchData();
      //     }, []);

  return (
    <Flex
      // bgImage={BgSignUp}
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <HomeNav />
      <Box
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
        mt={{ md: "14px" }}
      ></Box>
      <Flex
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
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="0px">
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
        <Flex
          direction="column"
          w="800px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register
          </Text>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Fill your credentials
          </Text>
          <FormControl>
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
              // onChange={(e)=>setName(e.target.value)}
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
              // onChange={(e)=>setEmail(e.target.value)}
              onChange={handleChange}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="password"
              type="password"
              placeholder="Your password"
              mb="24px"
              size="lg"
              name="password"
              // onChange={(e)=>setPassword(e.target.value)}
              onChange={handleChange}
            />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Confirm Password
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='confirmpassword'
            type='password'
            placeholder='Confirm password'
            mb='24px'
            size='lg'
            name="Confirmpassword"
            // onChange={(e)=>setConfirmpassword(e.target.value)}
            onChange={handleChange}
          />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              aadhar Number
            </FormLabel>
            <Input
              fontSize="sm"
              maxLength="12"
              ms="4px"
              borderRadius="15px"
              id="aadhar"
              type="number"
              placeholder="12 digit aadhar number"
              mb="24px"
              size="lg"
              name="aadharNumber"
              // onChange={(e)=>setaadhar(e.target.value)}
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
              placeholder="10 digit phone number"
              mb="24px"
              size="lg"
              name="mobileNumber"
              maxLength={10}
              // onChange={(e)=>setMobile(e.target.value)}
              onChange={handleChange}
            />

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
              // onChange={(e)=>setType(e.target.value)}>
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Non-academic staff">Non-academic staff</option>
            </Select>

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Department
            </FormLabel>


          <Select fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='department'
            placeholder='Select your department' 
            mb='24px'
            size='lg'
            name="department"
            // onChange={(e)=>setDepartment(e.target.value)}>
            onChange={handleChange}>

              {/* TODO: Implement auto department fetch */}
            {/* {departments.map((departments) => ( 
                <option value={departments.dName}>{departments.dName}</option>
              ))} */}
              <option value='MACS'>MACS</option>
            <option value='CSE'>CSE</option>

            </Select>

            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Address
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            type='text'
            id='address'
            placeholder='Address line 1'
            mb='24px'
            size='lg'
            name="addressline1"
            // onChange={(e)=>setAddressline1(e.target.value)}
            // onChange={handleChange}  
            // TODO: to be set
          />

          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            type='text'
            placeholder='Address line 2'
            mb='24px'
            size='lg'
            name="addressline2"
            // onChange={(e)=>setAddressline2(e.target.value)}
            // onChange={handleChange}
          />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            City
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='city'
            type='text'
            placeholder='City'
            mb='24px'
            size='lg'
            name="city"
            // onChange={(e)=>setCity(e.target.value)}
            // onChange={handleChange}
          />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            State
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='state'
            type='text'
            placeholder='State'
            mb='24px'
            size='lg'
            name="state"
            // onChange={(e)=>setState(e.target.value)}
            // onChange={handleChange}
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
              placeholder="State"
              mb="24px"
              size="lg"
              name="state"
              // onChange={(e)=>setState(e.target.value)}
              onChange={handleChange}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Country
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              id="country"
              type="text"
              placeholder="Country"
              mb="24px"
              size="lg"
              name="country"
              // onChange={(e)=>setCountry(e.target.value)}
              onChange={handleChange}
            />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Pincode
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='pinCode'
            type='number'
            placeholder='PinCode'
            mb='24px'
            size='lg'
            name="pinCode"
            // onChange={(e)=>setCountry(e.target.value)}
            onChange={handleChange}
          />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Gender
          </FormLabel>
          <Select fontSize='sm'
            ms='4px'
            borderRadius='15px'
            placeholder='Select your gender' 
            mb='24px'
            id='gender'
            size='lg'
            name="gender"
            // onChange={(e)=>setGender(e.target.value)}
            onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>

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
              // onChange={(e)=>postDetails(e.target.files[0])}
              onChange={handleChange}
            />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Upload your Picture
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            borderRadius='15px'
            id='picture'
            type='file'
            accept='image/*'
            pt={2}
            mb='24px'
            size='lg'
            name="photo"
            // onChange={(e)=>postDetails(e.target.files[0])}
            // onChange={(e)=> console.log(e.target.value)}
            onChange={handleChange}
          />

<FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
            Upload your Id proof
          </FormLabel>
          <Input
            fontSize='sm'
            ms='4px'
            id='idproof'
            borderRadius='15px'
            type='file'
            accept='image/*'
            pt={2}
            mb='24px'
            size='lg'
            name="idProof"
            // onChange={(e)=>postIdentity(e.target.files[0])}
            onChange={handleChange}
          />

            {/* <FormControl display='flex' alignItems='center' mb='24px'>
            <Switch id='remember-login' colorScheme='teal' me='10px' />
            <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
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
              <Text color="red" marginBottom="15px" fontWeight="medium">
                {/* {error} */}
              </Text>
            </Flex>
            <Button
              onClick={handleSubmit}
              type="submit"
              bg="teal.300"
              fontSize="10px"
              color="white"
              fontWeight="bold"
              w="100%"
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
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                ms="5px"
                // onClick={history('/')}
                href="/"
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
        {/* )} */}
      </Flex>
    </Flex>
  )
}

export default SignUp
