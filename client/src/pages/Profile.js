import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Box, ButtonGroup, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, useEditableControls, VStack } from '@chakra-ui/react'
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
   <Box maxW={'50rem'} borderWidth='1px' borderRadius='lg' overflow='hidden' justifyContent={'center'} p='10'
   boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
   >
   <Avatar size='2xl' name={userProfile.name} src='https://bit.ly/sage-adebayo' />{' '}
   <Text> {userProfile.name} </Text>
    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Name </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.name}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Email </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.email}
    disabled
    />
    </HStack>
    </FormControl>
   
    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Aadhar Number </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="number"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.aadhar_number}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Mobile Number </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="number"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.mobile_number}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'> Gender </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.gender}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Department </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.department}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Type of Applicant </FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.type}
    disabled
    />
    </HStack>
    </FormControl>


    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 1</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.address_line1}
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Address Line 2</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.address_line2}
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>City</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.city}
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>State</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.state}
    />
    </HStack>
    </FormControl>
   
    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Pincode</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.pin_code}
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Country</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.country}
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Profile Status</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type="text"
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    value={userProfile.status}
    disabled
    />
    </HStack>
    </FormControl>

    <FormControl>
    <HStack>
    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Id proof</FormLabel>
    <Input
    fontSize="sm"
    ms="4px"
    borderRadius="15px"
    type='file'
    accept='image/*'
    id="name  "
    mb="24px"
    size="lg"
    name="name"
    variant='filled'
    placeholder={userProfile.id_proof}
    />
    </HStack>
    </FormControl>
   </Box>
   </Box>
   </Flex>
   </>
  )
}

export default Profile
