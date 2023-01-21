import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Box, ButtonGroup, Divider, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, useEditableControls, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom';
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
    variant='filled'
    placeholder={userProfile.name}
    disabledInputStyle={{opacity: 1}}
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
    width='sm'
    ms="4px"
    borderRadius="15px"
    type="text"
    id="email  "
    mb="24px"
    size="lg"
    name="email"
    variant='filled'
    placeholder={userProfile.email}
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
    variant='filled'
    placeholder={userProfile.aadhar_number}
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
    name="mobile"
    placeholder={userProfile.mobile_number}
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
    variant='filled'
    placeholder={userProfile.gender}
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
    variant='filled'
    placeholder={userProfile.department}
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
    variant='filled'
    placeholder={userProfile.type}
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
    placeholder={userProfile.id_proof}
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
    value={userProfile.address_line1}
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
    value={userProfile.address_line2}
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
    value={userProfile.city}
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
    value={userProfile.state}
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
    value={userProfile.pin_code}
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
    value={userProfile.country}
    />
    </HStack>
    </FormControl>
    </HStack>
<Divider/>
    

    
   </Box>
   </Box>
   </Flex>
   </>
  )
}

export default Profile
