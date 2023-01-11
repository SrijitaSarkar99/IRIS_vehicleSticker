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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import AuthApi from '../api/auth';
import { useAuth } from '../auth-context/auth.context';
import { useNavigate } from 'react-router-dom';
import { Vehicles } from '../pages/Vehicles'

export default function Simple() {
  const { user, setUser } = useAuth();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  // const { osOpen, onToggle } = useDisclosure()
  const navigate=useNavigate();

  const handleLogout = () => {
    AuthApi.Logout(user)
    setUser(null);
    localStorage.removeItem("user");
    return navigate("/");
  }

  return (
    
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
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </HStack>
          </HStack>
          
          
              
          <Flex alignItems={'center'} spacing='20'>
          <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem  >Profile</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem  > <Link onClick={handleLogout}>Log Out</Link></MenuItem>
              </MenuList>
            </Menu>
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
  );
}