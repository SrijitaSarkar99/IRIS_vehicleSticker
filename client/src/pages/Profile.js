import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { BsFillPatchExclamationFill, BsPatchCheck, BsPatchExclamation, IconName } from "react-icons/bs";
import { Avatar, Box, Button, ButtonGroup, Divider, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, useEditableControls, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import AdminNav from "../components/AdminNav"

function Profile() {
  
  const [userProfile,setuserProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.500", "white.200");
  const toast = useToast();
  const navigate = useNavigate();
  const [userMobile, setUserMobile] = useState([]);
  const [userAddressLine1, setuserAddressLine1] = useState([]);
  const [userAddressLine2, setuserAddressLine2] = useState([]);
  const [userCity, setUserCity] = useState([]);
  const [userState, setUserState] = useState([]);
  const [userPincode, setUserPincode] = useState([]);
  const [userCountry, setUserCountry] = useState([]);
  const [userIdProof, setUserIdProof] = useState([]);

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // e.preventDefault();

    // axios.patch(`http://localhost:5000/users/${currentUser.userId}`,user,{Authorization: `Bearer ${currentUser.token}`})
    //     .then(response => {
    //       console.log(response)
    //       setIsEditing(false)
    //     })

      const data = new FormData();
      data.append('mobileNumber',userMobile)
      data.append('addressLine1',userAddressLine1)
      data.append('addressLine2',userAddressLine2)
      data.append('city',userCity)
      data.append('state',userState)
      data.append('pinCode',userPincode)
      data.append('country', userCountry)
      
      // // for (const property in formData) {
      //   // data.append(property, formData[property]);
      // // }
      try {
        // console.log(currentUser.userId);
        // console.log(currentUser.token);
        const response = await axios({
          method: "patch",
          url: `http://localhost:5000/users/${currentUser.userId}`,
          data: data,
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}`},
        });
        toast({
          title: 'Profile Updated.',
          // description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setIsEditing(false)
        setuserProfile(response.data);
      setUserMobile(response.data.mobile_number)
      setuserAddressLine1(response.data.address_line1)
      setuserAddressLine2(response.data.address_line2)
      setUserCity(response.data.city)
      setUserState(response.data.state)
      setUserPincode(response.data.pin_code)
      setUserCountry(response.data.country)
        // window.location.reload(true)
      } catch (error) {
        toast({
          title: 'Error Occured',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(error.response)
      }
    }
  
// const handleSubmit = async (e)=>{
//   e.preventDefault();
//     const data = new FormData();
//     data.append('mobile_number', {userMobile})
//     // for (const property in formData) {
//       // data.append(property, formData[property]);
//     // }
//     try {
//       const response = await axios({
//         method: "patch",
//         url: `http://localhost:5000/users/${currentUser.userId}`,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}`},
//       });
//       toast({
//         title: 'Profile Updated.',
//         // description: "",
//         status: 'success',
//         duration: 9000,
//         isClosable: true,
//       });
//       navigate('/Profile');
//     } catch (error) {
//       toast({
//         title: 'Error Occured',
//         description: error.response.data.message,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//       console.log(error.response)
//     }
//   }
  
  useEffect(() => {
    async function fetchData(){
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/users/${currentUser.userId}`,
        headers:{Authorization: `Bearer ${currentUser.token}`}
      }); 
      setuserProfile(response.data);
      setUserMobile(response.data.mobile_number)
      setuserAddressLine1(response.data.address_line1)
      setuserAddressLine2(response.data.address_line2)
      setUserCity(response.data.city)
      setUserState(response.data.state)
      setUserPincode(response.data.pin_code)
      setUserCountry(response.data.country)
      // setUserIdProof(response.data.id_proof)
    } 
    catch(error) {
      console.log(error);
    }
    }
    fetchData();
      }, []);
  return (
   <>
   <AdminNav/>
        {isEditing ? (
          <Flex direction="column" align="center" justify="center">
          <Box w="80%" mb={4}>
            {/* <Image src='https://bit.ly/sage-adebayo' rounded="full" size="2px" /> */}
          </Box>
          <Box w="80%">
          <Flex width="full" align="center" justifyContent="center">
      <Box>
       <Heading
                  w='100%'
                  color={titleColor}
                  fontWeight='bold'
                  mt='10px'
                  mb='26px'
                  marginTop={3}>User Profile </Heading>
       <Box 
      //  w='1080px'
       maxW={'50rem'}
      // position="absolute"
        borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent={'center'} p='10'
       boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
       >
        <HStack spacing='25rem'>
       <Avatar size='2xl' name={userProfile.name} src='https://bit.ly/sage-adebayo' />{' '}
       {console.log(userProfile.name)}
    <Text colorScheme={'red'}>
    {userProfile.status}
    {userProfile.status === "unverified"
              ? <BsPatchExclamation />
              : <BsPatchCheck />
    }
    </Text>
    
    
        </HStack>
    <Divider
    mt={'1rem'}
    />
    <Heading
    size={'sm'}
    color={titleColor}
    mt='1rem'
    >
      Personal Details
    </Heading>
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Name </FormLabel>
        <Input
        fontSize="sm"
        ms="4px"
        width='auto'
        borderRadius="15px"
        type="text"
        id="name  "
        mb="24px"
        size="lg"
        name="name"
        value={userProfile.name}
        disabled
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Email </FormLabel>
        <Input
        fontSize="sm"
        width='15rem'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="email  "
        mb="24px"
        size="lg"
        name="email"
        value={userProfile.email}
        disabled
        />
        </HStack>
        </FormControl>
        </HStack>
    
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Aadhar Number </FormLabel>
        <Input
        fontSize="sm"
        ms="4px"
        width='auto'
        borderRadius="15px"
        type="number"
        id="aadhar"
        mb="24px"
        size="lg"
        name="aadhar"
        value={userProfile.aadhar_number}
        disabled
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Mobile Number </FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="number"
        id="mobile  "
        mb="24px"
        size="lg"
        name="mobile_number"
        value={userMobile}
        // onChange={e => setUser({ ...user, mobile_number: e.target.value })}
        // value={userMobile}
        onChange={(e) => {
            setUserMobile(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
        </HStack>
    
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Gender </FormLabel>
        <Input
        width='auto'
        fontSize="sm"
        ms="4px"
        borderRadius="15px"
        type="text"
        id="gender"
        mb="24px"
        size="lg"
        name="gender"
        value={userProfile.gender}
        disabled
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Department </FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="department"
        mb="24px"
        size="lg"
        name="department"
        value={userProfile.department}
        disabled
        />
        </HStack>
        </FormControl>
        </HStack>
    
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Type of Applicant </FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="type"
        mb="24px"
        size="lg"
        name="type"
        value={userProfile.type}
        disabled
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Id proof</FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        pt={'3'}
        ms="4px"
        borderRadius="15px"
        type='file'
        accept='image/*'
        id="idproof"
        mb="24px"
        size="lg"
        name="idproof"
        // onChange={e => setUser({ ...user, idproof: e.target.files[0] })}
        value={userIdProof}
        onChange={(e) => {
            setUserIdProof(e.target.files[0]);
          }}
        />
        </HStack>
        </FormControl>
        </HStack>
    
      <Divider/>
    <Heading
    size={'sm'}
    color={titleColor}
    mt='1rem'
    >
      Permanent Address 
    </Heading>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 1</FormLabel>
        <Input
        fontSize="sm"
        width='lg'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="addressline1"
        mb="24px"
        size="lg"
        name="address_line1"
        // value={user.address_line1}
        // onChange={e => setUser({ ...user, address_line1: e.target.value })}
        value={userAddressLine1}
        onChange={(e) => {
            setuserAddressLine1(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 2</FormLabel>
        <Input
        fontSize="sm"
        width='lg'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="addressline2"
        mb="24px"
        size="lg"
        name="address_line2"
        // value={user.address_line2}
        // onChange={e => setUser({ ...user, address_line2: e.target.value })}
        value={userAddressLine2}
        onChange={(e) => {
            setuserAddressLine2(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
    
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>City</FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="city  "
        mb="24px"
        size="lg"
        name="city"
        // value={user.city}
        // onChange={e => setUser({ ...user, city: e.target.value })}
        value={userCity}
        onChange={(e) => {
            setUserCity(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>State</FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="state  "
        mb="24px"
        size="lg"
        name="state"
        // value={user.state}
        // onChange={e => setUser({ ...user, state: e.target.value })}
        value={userState}
        onChange={(e) => {
            setUserState(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
        </HStack>
    
    <HStack>
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Pincode</FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="pincode"
        mb="24px"
        size="lg"
        name="pin_code"
        // value={user.pin_code}
        // onChange={e => setUser({ ...user, pin_code: e.target.value })}
        value={userPincode}
        onChange={(e) => {
            setUserPincode(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
    
        <FormControl
         mt='1rem'
         mb='1rem'>
        <HStack>
        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Country</FormLabel>
        <Input
        fontSize="sm"
        width='auto'
        ms="4px"
        borderRadius="15px"
        type="text"
        id="country"
        mb="24px"
        size="lg"
        name="country"
        // value={user.country}
        // onChange={e => setUser({ ...user, country: e.target.value })}
        value={userCountry}
        onChange={(e) => {
            setUserCountry(e.target.value);
          }}
        />
        </HStack>
        </FormControl>
        </HStack>
    <Divider/>
    <HStack mt={'1rem'} >
    <Button onClick={handleSubmit} type="submit">Save</Button>
    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
    </HStack>
    </Box>
    </Box>
    </Flex>
    </Box>
    </Flex>
          // <EditForm user={userProfile} setUser={setuserProfile} setIsEditing={setIsEditing} />
        ) : (
          <Flex direction="column" align="center" justify="center">
      <Box w="80%" mb={4}>
        {/* <Image src='https://bit.ly/sage-adebayo' rounded="full" size="2px" /> */}
      </Box>
      <Box w="80%">
      <Flex width="full" align="center" justifyContent="center">
  <Box>
   <Heading
              w='100%'
              color={titleColor}
              fontWeight='bold'
              mt='10px'
              mb='26px'
              marginTop={3}>User Profile </Heading>
   <Box 
  //  w='1080px'
   maxW={'50rem'}
  // position="absolute"
    borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent={'center'} p='10'
   boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
   >
    <HStack spacing='25rem'>
   <Avatar size='2xl' name={userProfile.name} src='https://bit.ly/sage-adebayo' />{' '}
   
<Text colorScheme={'red'}>
{userProfile.status}
{userProfile.status === "unverified"
          ? <BsPatchExclamation />
          : <BsPatchCheck />
}
</Text>


    </HStack>
<Divider
mt={'1rem'}
/>
<Heading
size={'sm'}
color={titleColor}
mt='1rem'
>
  Personal Details
</Heading>
<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Name :</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    width='auto'
    borderRadius="15px"
   variant={'unstyled'}
    type="text"
    id="name  "
    pb={'0.5rem'}
    mb="24px"
    size="lg"
    name="name"
    value={userProfile.name}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'
     >
    <HStack 
    // marginLeft={'8.5rem'}
    >
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Email :</FormLabel>
    <Input
    fontSize="sm"
    width='15rem'
    ms="4px"
    // borderRadius="15px"
    type="text"
    id="email  "
    pb={'0.5rem'}
    mb="24px"
    size="lg"
    name="email"
    variant={'unstyled'}
    value={userProfile.email}
    />
    </HStack>
    </FormControl>
    </HStack>

<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Aadhar Number :</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    width='auto'
    // borderRadius="15px"
    type="number"
    id="aadhar"
    pb={'0.5rem'}
    mb="24px"
    size="lg"
    name="aadhar"
    variant={'unstyled'}
    value={userProfile.aadhar_number}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Mobile Number :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    type="number"
    pb={'0.5rem'}
    id="mobile  "
    mb="24px"
    size="lg"
    name="mobile_number"
    variant={'unstyled'}
    value={userProfile.mobile_number}
    
    // value={userMobile}
    // onChange={(e) => {
    //     setUserMobile(e.target.value);
      // }}
    />
    </HStack>
    </FormControl>
    </HStack>

<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'> Gender :</FormLabel>
    <Input
    width='auto'
    fontSize="sm"
    ms="4px"
    // borderRadius="15px"
    type="text"
    pb={'0.5rem'}
    id="gender"
    mb="24px"
    size="lg"
    name="gender"
    variant={'unstyled'}
    value={userProfile.gender}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Department :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    type="text"
    pb={'0.5rem'}
    id="department"
    mb="24px"
    size="lg"
    name="department"
    variant={'unstyled'}
    value={userProfile.department}
    />
    </HStack>
    </FormControl>
    </HStack>

<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Type of Applicant :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    type="text"
    pb={'0.5rem'}
    id="type"
    mb="24px"
    size="lg"
    name="type"
    variant={'unstyled'}
    value={userProfile.type}
    />
    </HStack>
    </FormControl>

    {/* <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Id proof</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    pt={'3'}
    ms="4px"
    // borderRadius="15px"
    type='file'
    accept='image/*'
    id="idproof"
    mb="24px"
    size="lg"
    name="idproof"
    value={userProfile.id_proof}
    // value={userIdProof}
    // onChange={(e) => {
    //     setUserIdProof(e.target.files[0]);
    //   }}
    />
    </HStack>
    </FormControl> */}
    </HStack>

  <Divider/>
<Heading
size={'sm'}
color={titleColor}
mt='1rem'
>
  Permanent Address 
</Heading>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Address Line 1 :</FormLabel>
    <Input
    fontSize="sm"
    width='lg'
    ms="4px"
    // borderRadius="15px"
    type="text"
    pb={'0.5rem'}
    id="addressline1"
    mb="24px"
    size="lg"
    name="addressline1"
    variant={'unstyled'}
    value={userProfile.address_line1}
    // value={userAddressLine1}
    // onChange={(e) => {
    //     setuserAddressLine1(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Address Line 2 :</FormLabel>
    <Input
    fontSize="sm"
    width='lg'
    ms="4px"
    // borderRadius="15px"
    type="text"
    pb={'0.5rem'}
    id="addressline2"
    mb="24px"
    size="lg"
    name="addressline2"
    variant={'unstyled'}
    value={userProfile.address_line2}
    // value={userAddressLine2}
    // onChange={(e) => {
    //     setuserAddressLine2(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>

<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>City :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    pb={'0.5rem'}
    type="text"
    id="city  "
    mb="24px"
    size="lg"
    name="city"
    variant={'unstyled'}
    value={userProfile.city}
    // value={userCity}
    // onChange={(e) => {
    //     setUserCity(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>State :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    pb={'0.5rem'}
    type="text"
    id="state  "
    mb="24px"
    size="lg"
    name="state"
    variant={'unstyled'}
    value={userProfile.state}
    // value={userState}
    // onChange={(e) => {
    //     setUserState(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>
    </HStack>

<HStack>
    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Pincode :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    pb={'0.5rem'}
    // borderRadius="15px"
    type="text"
    id="pincode"
    mb="24px"
    size="lg"
    name="pincode"
    variant={'unstyled'}
    value={userProfile.pin_code}
    // value={userPincode}
    // onChange={(e) => {
    //     setUserPincode(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>

    <FormControl
     mt='1rem'
     mb='1rem'>
    <HStack>
    <FormLabel ms='4px' color={textColor} fontSize='sm' fontWeight='normal'>Country :</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    // borderRadius="15px"
    type="text"
    id="country"
    mb="24px"
    pb={'0.5rem'}
    size="lg"
    name="country"
    variant={'unstyled'}
    value={userProfile.country}
    // value={userCountry}
    // onChange={(e) => {
    //     setUserCountry(e.target.value);
    //   }}
    />
    </HStack>
    </FormControl>
    </HStack>
<Divider/>
<Button onClick={handleEditClick}>Edit Details</Button>
</Box>
</Box>
</Flex>
</Box>
</Flex>
)}
      
   {/* <Flex width="full" align="center" justifyContent="center">
  <Box>
   <Heading
              w='100%'
              color={titleColor}
              fontWeight='bold'
              mt='10px'
              mb='26px'
              marginTop={3}>User Profile </Heading>
   <Box 
  //  w='1080px'
   maxW={'50rem'}
  // position="absolute"
    borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent={'center'} p='10'
   boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
   >
    <HStack spacing='25rem'>
   <Avatar size='2xl' name={userProfile.name} src='https://bit.ly/sage-adebayo' />{' '}
<Text>Profile:  {userProfile.status}</Text>
    </HStack>
<Divider
mt={'1rem'}
/>
<Heading
size={'sm'}
color={titleColor}
mt='1rem'
>
  Personal Details
</Heading>
   
    
   </Box>
   </Box>
   </Flex> */}
   </>
  )
}

// const EditForm = ({ user, setUser, setIsEditing }) => {
//   const currentUser = JSON.parse(localStorage.getItem("user"));
  
//   const titleColor = useColorModeValue("teal.300", "teal.200");
//   const toast = useToast();
//   const navigate = useNavigate();
  

  // handle form submission
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // send updated data to back-end
  //   axios.put(`http://localhost:5000/users/${currentUser.userId}`,user)
  //     .then(response => {
  //       console.log(response)
  //       setIsEditing(false)
  //     })
  // }
  // const handleSubmit = async (e)=>{
  //   // e.preventDefault();

  //   // axios.patch(`http://localhost:5000/users/${currentUser.userId}`,user,{Authorization: `Bearer ${currentUser.token}`})
  //   //     .then(response => {
  //   //       console.log(response)
  //   //       setIsEditing(false)
  //   //     })

  //     // const data = new FormData();
  //     // data.append('mobile_number', {userMobile})
  //     // // for (const property in formData) {
  //     //   // data.append(property, formData[property]);
  //     // // }
  //     try {
  //       console.log(currentUser.userId);
  //       console.log(currentUser.token);
  //       const response = await axios({
  //         method: "patch",
  //         url: `http://localhost:5000/users/${currentUser.userId}`,
  //         data: user,
  //         headers: {  Authorization: `Bearer ${currentUser.token}`},
  //       });
  //       toast({
  //         title: 'Profile Updated.',
  //         // description: "",
  //         status: 'success',
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //       setIsEditing(false)
  //       // navigate('/Profile');
  //     } catch (error) {
  //       toast({
  //         title: 'Error Occured',
  //         description: error.response.data.message,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       console.log(error.response)
  //     }
  //   }

//   return (
//     // <form onSubmit={handleSubmit}>
//           <Flex direction="column" align="center" justify="center">
//       <Box w="80%" mb={4}>
//         {/* <Image src='https://bit.ly/sage-adebayo' rounded="full" size="2px" /> */}
//       </Box>
//       <Box w="80%">
//       <Flex width="full" align="center" justifyContent="center">
//   <Box>
//    <Heading
//               w='100%'
//               color={titleColor}
//               fontWeight='bold'
//               mt='10px'
//               mb='26px'
//               marginTop={3}>User Profile </Heading>
//    <Box 
//   //  w='1080px'
//    maxW={'50rem'}
//   // position="absolute"
//     borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent={'center'} p='10'
//    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
//    >
//     <HStack spacing='25rem'>
//    <Avatar size='2xl' name={user.name} src='https://bit.ly/sage-adebayo' />{' '}
   
// <Text colorScheme={'red'}>
// {user.status}
// {user.status === "unverified"
//           ? <BsPatchExclamation />
//           : <BsPatchCheck />
// }
// </Text>


//     </HStack>
// <Divider
// mt={'1rem'}
// />
// <Heading
// size={'sm'}
// color={titleColor}
// mt='1rem'
// >
//   Personal Details
// </Heading>
// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Name </FormLabel>
//     <Input
//     fontSize="sm"
//     ms="4px"
//     width='auto'
//     borderRadius="15px"
//     type="text"
//     id="name  "
//     mb="24px"
//     size="lg"
//     name="name"
//     value={user.name}
//     disabled
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Email </FormLabel>
//     <Input
//     fontSize="sm"
//     width='15rem'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="email  "
//     mb="24px"
//     size="lg"
//     name="email"
//     value={user.email}
//     disabled
//     />
//     </HStack>
//     </FormControl>
//     </HStack>

// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Aadhar Number </FormLabel>
//     <Input
//     fontSize="sm"
//     ms="4px"
//     width='auto'
//     borderRadius="15px"
//     type="number"
//     id="aadhar"
//     mb="24px"
//     size="lg"
//     name="aadhar"
//     value={user.aadhar_number}
//     disabled
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Mobile Number </FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="number"
//     id="mobile  "
//     mb="24px"
//     size="lg"
//     name="mobile_number"
//     value={user.mobile_number}
//     onChange={e => setUser({ ...user, mobile_number: e.target.value })}
//     // value={userMobile}
//     // onChange={(e) => {
//     //     setUserMobile(e.target.value);
//       // }}
//     />
//     </HStack>
//     </FormControl>
//     </HStack>

// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Gender </FormLabel>
//     <Input
//     width='auto'
//     fontSize="sm"
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="gender"
//     mb="24px"
//     size="lg"
//     name="gender"
//     value={user.gender}
//     disabled
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Department </FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="department"
//     mb="24px"
//     size="lg"
//     name="department"
//     value={user.department}
//     disabled
//     />
//     </HStack>
//     </FormControl>
//     </HStack>

// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Type of Applicant </FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="type"
//     mb="24px"
//     size="lg"
//     name="type"
//     value={user.type}
//     disabled
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Id proof</FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     pt={'3'}
//     ms="4px"
//     borderRadius="15px"
//     type='file'
//     accept='image/*'
//     id="idproof"
//     mb="24px"
//     size="lg"
//     name="idproof"
//     onChange={e => setUser({ ...user, idproof: e.target.files[0] })}
//     // value={userIdProof}
//     // onChange={(e) => {
//     //     setUserIdProof(e.target.files[0]);
//     //   }}
//     />
//     </HStack>
//     </FormControl>
//     </HStack>

//   <Divider/>
// <Heading
// size={'sm'}
// color={titleColor}
// mt='1rem'
// >
//   Permanent Address 
// </Heading>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 1</FormLabel>
//     <Input
//     fontSize="sm"
//     width='lg'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="addressline1"
//     mb="24px"
//     size="lg"
//     name="address_line1"
//     value={user.address_line1}
//     onChange={e => setUser({ ...user, address_line1: e.target.value })}
//     // value={userAddressLine1}
//     // onChange={(e) => {
//     //     setuserAddressLine1(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 2</FormLabel>
//     <Input
//     fontSize="sm"
//     width='lg'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="addressline2"
//     mb="24px"
//     size="lg"
//     name="address_line2"
//     value={user.address_line2}
//     onChange={e => setUser({ ...user, address_line2: e.target.value })}
//     // value={userAddressLine2}
//     // onChange={(e) => {
//     //     setuserAddressLine2(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>

// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>City</FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="city  "
//     mb="24px"
//     size="lg"
//     name="city"
//     value={user.city}
//     onChange={e => setUser({ ...user, city: e.target.value })}
//     // value={userCity}
//     // onChange={(e) => {
//     //     setUserCity(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>State</FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="state  "
//     mb="24px"
//     size="lg"
//     name="state"
//     value={user.state}
//     onChange={e => setUser({ ...user, state: e.target.value })}
//     // value={userState}
//     // onChange={(e) => {
//     //     setUserState(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>
//     </HStack>

// <HStack>
//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Pincode</FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="pincode"
//     mb="24px"
//     size="lg"
//     name="pin_code"
//     value={user.pin_code}
//     onChange={e => setUser({ ...user, pin_code: e.target.value })}
//     // value={userPincode}
//     // onChange={(e) => {
//     //     setUserPincode(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>

//     <FormControl
//      mt='1rem'
//      mb='1rem'>
//     <HStack>
//     <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Country</FormLabel>
//     <Input
//     fontSize="sm"
//     width='auto'
//     ms="4px"
//     borderRadius="15px"
//     type="text"
//     id="country"
//     mb="24px"
//     size="lg"
//     name="country"
//     value={user.country}
//     onChange={e => setUser({ ...user, country: e.target.value })}
//     // value={userCountry}
//     // onChange={(e) => {
//     //     setUserCountry(e.target.value);
//     //   }}
//     />
//     </HStack>
//     </FormControl>
//     </HStack>
// <Divider/>
// <Button onClick={() => handleSubmit()} type="submit">Save</Button>
//       <Button onClick={() => setIsEditing(false)}>Cancel</Button>
// </Box>
// </Box>
// </Flex>
// </Box>
// </Flex>
//   )
      
//       {/* <input 
//       type="text" 
//       placeholder="Name" 
//       value={user.name} 
//       onChange={e => setUser({ ...user, name: e.target.value })} />

//       <input 
//       type="text" 
//       placeholder="Occupation" 
//       value={user.occupation} 
//       onChange={e => setUser({ ...user, occupation: e.target.value })} />

//       <input 
//       type="file" 
//       onChange={e => setUser({ ...user, profile_picture: e.target.files[0] })} />

//       <Button type="submit">Save</Button>
//       <Button onClick={() => setIsEditing(false)}>Cancel</Button> 
//     </form> */}
  
// }

export default Profile
