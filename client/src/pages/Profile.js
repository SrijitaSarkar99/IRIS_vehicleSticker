import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, ButtonGroup, Divider, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, useEditableControls, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import AdminNav from "../components/AdminNav"

  
function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent='center' size='sm'>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center'>
      <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  )
}

function Profile() {
  
  const [userProfile,setuserProfile] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const titleColor = useColorModeValue("teal.300", "teal.200");
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
  
const handleSubmit = async (e)=>{
  e.preventDefault();
    const data = new FormData();
    data.append('mobile_number', {userMobile})
    // for (const property in formData) {
      // data.append(property, formData[property]);
    // }
    try {
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
      navigate('/Profile');
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
  
  useEffect(() => {
    async function fetchData(){
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/users/${currentUser.userId}`,
        headers:{Authorization: `Bearer ${currentUser.token}`}
      }); 
      setuserProfile(response.data);
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
<Text>Profile:  {userProfile.status}</Text>
   {/* <FormControl 
     mt='1rem'
     mb='1rem'
    >
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Profile Status</FormLabel>
    <Input
    fontSize="sm"
    width='auto'
    ms="4px"
    borderRadius="15px"
    type="text"
    id="status"
    mb="24px"
    size="lg"
    name="status"
    variant='filled'
    value={userProfile.status}
    disabled
    />
    </HStack>
    </FormControl> */}
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
    disabledInputStyle={{opacity: 1}}
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
    width='sm'
    ms="4px"
    borderRadius="15px"
    type="text"
    id="email  "
    mb="24px"
    size="lg"
    name="email"
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
    name="mobile"
    // value={userProfile.mobile_number}
    placeholder={userProfile.mobile_number}
    value={userMobile}
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
    placeholder={userProfile.id_proof}
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
    name="addressline1"
    placeholder={userProfile.address_line1}
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
    name="addressline2"
    placeholder={userProfile.address_line2}
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
    placeholder={userProfile.city}
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
    placeholder={userProfile.state}
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
    name="pincode"
    placeholder={userProfile.pin_code}
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
    placeholder={userProfile.country}
    value={userCountry}
    onChange={(e) => {
        setUserCountry(e.target.value);
      }}
    />
    </HStack>
    </FormControl>
    </HStack>
<Divider/>
    <Button onClick={handleSubmit}>Submit</Button>

    
   </Box>
   </Box>
   </Flex>
   </>
  )
}

export default Profile
