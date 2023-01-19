import { Editable, EditablePreview, HStack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNav from "../components/AdminNav"

function Profile() {
  const [userProfile,setuserProfile] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
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
   <VStack>
    <HStack>
    <Text>Name:</Text>
    <Editable
      textAlign='center'
      value={userProfile.name}
      fontSize='md'
      isPreviewFocusable={false}
    >
      <EditablePreview />
   </Editable>
   </HStack>

   <HStack>
    <Text>Email:</Text>
    <Editable
      textAlign='center'
      value={userProfile.email}
      fontSize='md'
      isPreviewFocusable={false}
    >
      <EditablePreview />
   </Editable>
   </HStack>

   <HStack>
    <Text>Phone Number:</Text>
    <Editable
      textAlign='center'
      value={userProfile.mobile_number}
      fontSize='md'
      isPreviewFocusable={false}
    >
      <EditablePreview />
   </Editable>
   </HStack>

   <HStack>
    <Text>Pincode:</Text>
    <Editable
      textAlign='center'
      value={userProfile.pin_code}
      fontSize='md'
      isPreviewFocusable={false}
    >
      <EditablePreview />
   </Editable>
   </HStack>

   <HStack>
    <Text>Address Line 1:</Text>
    <Editable
      textAlign='center'
      value={userProfile.addressLine1}
      fontSize='md'
      isPreviewFocusable={false}
    >
      <EditablePreview />
   </Editable>
   </HStack>
   </VStack>
   </>
  )
}

export default Profile
