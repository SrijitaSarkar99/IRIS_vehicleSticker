import React from "react"
import { Navigate, useHref } from "react-router-dom"
import { Box, Button, Container, Flex, Link } from "@chakra-ui/react"
import SignIn from "./SignIn"
import HomeNav from "../components/HomeNav"
function Homepage() {
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <HomeNav />
      <Container centerContent>
        <SignIn />
      </Container>
    </Flex>
  )
}

export default Homepage
