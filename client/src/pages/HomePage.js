import React from "react"
import {  Container } from "@chakra-ui/react"


function Homepage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    {currentUser ? (
    // <Vehicles/>
    window.location.href = '/vehicles'
    ):(<>
      <Container centerContent>
      {window.location.href = '/auth/signin'}
      </Container>
    </>) }
     
    </>
  )
}

export default Homepage
