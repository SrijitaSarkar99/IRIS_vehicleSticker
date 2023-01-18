import { Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNav from "../components/AdminNav"

function Profile() {
  const [userProfile,setuserProfile] = useState();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function fetchData(){
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5000/users/${currentUser.userId}`,
        headers:{Authorization: `Bearer ${currentUser.token}`}
      }); 
      console.log(response.data);
      // setUserVehicles(response.data);
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

   
   </>
  )
}

export default Profile
