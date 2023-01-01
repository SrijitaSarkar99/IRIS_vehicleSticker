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
      <button
        onClick={(e) => {
          fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "xyz@gmail.com",
              password: "123456",
            }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        }}
      >
        Button
      </button>
    </Flex>
  )
}

export default Homepage
