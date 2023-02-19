import React from "react"
import { Navigate, useHref, useNavigate } from "react-router-dom"
import {  Container,  Link } from "@chakra-ui/react"
import SignIn from "./SignIn"
import HomeNav from "../components/HomeNav"
import Vehicles from "./Vehicles"

function Homepage() {
  const navigate=useNavigate();
  const hr=useHref();
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
