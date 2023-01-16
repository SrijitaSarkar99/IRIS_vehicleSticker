import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Collapse,
  Text,
  Card,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import AuthApi from '../api/auth';
import { useAuth } from '../auth-context/auth.context';
import { NavLink, useNavigate } from 'react-router-dom';
import { Vehicles } from '../pages/Vehicles'
import Profile  from '../pages/Profile'
import React, { Component } from 'react';

export default function Simple() {
  const { user, setUser } = useAuth();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // const { osOpen, onToggle } = useDisclosure()
  const navigate=useNavigate();

  /*For Logout Confirmation */
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose} = useDisclosure()
  const cancelRef = React.useRef()
  /***************************************/
  const handleLogout = () => {
    AuthApi.Logout(user)
    setUser(null);
    localStorage.removeItem("user");
    return navigate("/");
  }

  const handleProfile = () => {
{/* <Profile/> */}
<NavLink to={Profile}>{Profile}</NavLink>
  }

  return (
    <>
     {/* AlertDialog for Logout */}
     <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onLogoutClose}
        isOpen={isLogoutOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Logout ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to Logout?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onLogoutClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleLogout}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

     {/* ************************************* */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Vehicle Sticker</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                // onClick={navigate('/Dashboard')}
                href={'/Dashboard'}
                >
                Dashboard
              </Link>
              {/* <Popover>
                <PopoverTrigger>
                  <Button onClick={onToggle}>Click Me</Button>
                </PopoverTrigger>
                <Collapse in={isOpen} animateOpacity>
                  <PopoverContent>       
                    <PopoverArrow />
                     
                    <PopoverBody
                      p='40px'
                      color='white'
                      mt='4'
                      bg='teal.500'
                      rounded='md'
                      shadow='md'
                      ></PopoverBody>
                    </PopoverContent>
               </Collapse>
              </Popover> */}
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                // onClick={navigate('/newSticker')}
                 href={'/Vehicles'}
                // onClick={ <newSticker/> }
                >
                My Vehicles
              </Link>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                // onClick={navigate('/newSticker')}
                 href={'/stickers'}
                // onClick={ <newSticker/> }
                >
                My Stickers
              </Link>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </HStack>
          </HStack>
          
          
              
          <Flex alignItems={'center'} spacing='20'>
            <HStack>
          <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'unstyled'}
                
                cursor={'pointer'}
                minW={0}>
                  <HStack>
                  <Avatar
                  size={'sm'}
                  src={
                    'https://bit.ly/broken-link'
                  }
                />
                  <Text alignContent='baseline'>{currentUser.name}</Text>
                
                </HStack>
              </MenuButton>
              <MenuList>
                
                <MenuItem  onClick={handleProfile}>Profile</MenuItem>
                {/* <MenuItem>Link 2</MenuItem> */}
                <MenuDivider />
                <MenuItem  onClick={onLogoutOpen}>Log Out</MenuItem>
              </MenuList>
            </Menu>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
      </>
  );
}