import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Flex, Box, Text, Image, Button } from '@chakra-ui/react'

const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch user details from back-end
    axios.get(`http://localhost:5000/users/${currentUser.userId}`)
      .then(response => {
        setUser(response.data)
      })
  }, [])

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Box w="80%" mb={4}>
        <Image src={user.photo} rounded="full" size="200px" />
      </Box>
      <Box w="80%">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">{user.name}</Text>
        <Text fontSize="lg" textAlign="center">{user.occupation}</Text>
        {isEditing ? (
          <EditForm user={user} setUser={setUser} setIsEditing={setIsEditing} />
        ) : (
          <Button onClick={handleEditClick}>Edit Details</Button>
        )}
      </Box>
    </Flex>
  )
}

const EditForm = ({ user, setUser, setIsEditing }) => {
  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // send updated data to back-end
    axios.put('https://my-backend.com/api/user/1', user)
      .then(response => {
        console.log(response)
        setIsEditing(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
      <input type="text" placeholder="Occupation" value={user.occupation} onChange={e => setUser({ ...user, occupation: e.target.value })} />
      <input type="file" onChange={e => setUser({ ...user, profile_picture: e.target.files[0] })} />
      <Button type="submit">Save</Button>
      <Button onClick={() => setIsEditing(false)}>Cancel</Button>
    </form>
  )
}

export default ProfilePage