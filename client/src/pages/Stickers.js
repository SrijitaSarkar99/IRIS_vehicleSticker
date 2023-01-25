import React, { useEffect, useState } from 'react'
import {
    Alert,
    AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {  AddIcon, WarningIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import AdminNav from "../components/AdminNav";
import axios from 'axios';

function Stickers() {
    const [VehicleId, setVehicleId] = useState();
    const [userVehicles, setUserVehicles] = useState([]);
    const [userStickers, setUserStickers] = useState([]);
    const [userStickersVehicle, setUserStickersVehicle] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    let dateToday=new Date().getFullYear()+"-"+new Date().getMonth()+1+"-"+new Date().getDate();
    let dateExpire=new Date().getFullYear()+2+"-"+new Date().getMonth()+1+"-"+new Date().getDate();
    const toast = useToast();
     /*For Add New Vehicle Modal Popup Button*/
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
   /***************************************/

    /*For Image Modal Popup Button*/
    const { isOpen: isImgOpen, onOpen: onImgOpen, onClose: onImgClose} = useDisclosure()
  /***************************************/

  /*For Deleting a Vehicle */
  const { isOpen: isVehicleDeleteOpen, onOpen: onVehicleDeleteOpen, onClose: onVehicleDeleteClose} = useDisclosure()
  const cancelRef = React.useRef()
  /***************************************/

    const titleColor = useColorModeValue("teal.300", "teal.200");

    const currentUser = JSON.parse(localStorage.getItem("user"));


      const handleSubmit =async (e) => {
        // const isValid = validateInput();
        e.preventDefault();
      
      const data = {
        "VehicleId": VehicleId,
        "date": dateToday,
        "validity": dateExpire,
        "dName": "IT"
    }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/stickers`,
        data: data,
        headers: { "Content-Type": "application/JSON",Authorization: `Bearer ${currentUser.token}` },
      });

      toast({
        title: 'Applied for a new Sticker.',
        description: "You have successfully applied for a new sticker. Keep checking the status.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      
    } catch(error) {
      console.log(error)
    }
      
      };

      useEffect(() => {
        async function fetchData(){
        try {
          const response = await axios({
            method: "get",
            url: `http://localhost:5000/vehicles?user_id=${currentUser.userId}&limit=${5}&page=${1}`
          }); 
          // console.log(response.data);
          setUserVehicles(response.data);
        } 
        catch(error) {
          console.log(error);
        }
        }

        fetchData();
          }, []);


          useEffect(() => {
            async function fetchData(){
            try {
              const response = await axios({
                method: "get",
                url: `http://localhost:5000/stickers?page=${1}&limit=${5}&user_id=${currentUser.userId}`,
                headers: { Authorization: `Bearer ${currentUser.token}`},
              }); 
              // console.log(response.data);
              setUserStickers(response.data);
              // console.log(userStickers.vehicle_id);
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

    <Modal
    size='xl'
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for a new sticker</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
                {/* <Box marginTop={3}>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select
                  borderRadius='10px'
                  placeholder='Select Vehicle Type'
                    name='VehicleType'
                    onChange={handleChange}
                  >
                    <option value="Two Wheeler" >Two Wheeler</option>
                    <option value="Four Wheeler">Four Wheeler</option>
                  </Select>
                </Box> */}
                <Box marginTop={3}>
                  <FormLabel>Select Vehicle</FormLabel>
                  
              <Select
              borderRadius='10px'
                // value={relationship}
                placeholder='Select Here'
                name='VehicleId'
                onChange={(e) =>setVehicleId(e.target.value)}
                required
              >
                {userVehicles.map((userVehicle) => ( 
                <option value={userVehicle.id}>{userVehicle.vehicle_no}</option>
            )
            )}
            </Select>
                </Box>
              </FormControl>

           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSubmit}> 
              Apply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


     {/* Modal for Image  */}

      <Modal closeOnOverlayClick={false} isOpen={isImgOpen} onClose={onImgClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          
            {/* <Image >{userVehicles.map((userVehicle) => ( 
              // userVehicle.rc_copy
              console.log(userVehicle.rc_copy)
            )
            )}</Image> */}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3}>
              Save
            </Button> */}
            <Button onClick={onImgClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
{/*****************************************************/ }

 {/* Alert For Vehicle Delete  */}
<AlertDialog
        isOpen={isVehicleDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onVehicleDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Vehicle
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onVehicleDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme='red' 
              // onClick={()=>
                
              //   toast({
              //     title: 'Vehicle Deleted',
              //     status: 'info',
              //     duration:3000,
              //     isClosable: true,
              //   });
              //   onVehicleDeleteClose;
              // }
              onClick={onVehicleDeleteClose} 
              ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
{/* ********************************************** */}
    <Flex width="100%" justify="center">
        {/* <Box >
        {alertMessage && (
            // toast(
            //     {
            //         title:'Incorrect Details.',
            //         description:<AlertDescription>{alertMessage}</AlertDescription>,
            //         status:'error',
            //         position:'bottom-right',
            //         duration:3000,
            //         isClosable:true
                    
            //     }
            // )
            <Box marginTop={5}>
        
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Incorrect Details</AlertTitle>
                <AlertDescription >{alertMessage}</AlertDescription>
              </Alert>
            </Box>
          )} */}





          <Box
            // border="1px"
            borderColor="gray.200"
            padding={5}
            borderRadius={5}
            marginTop={5}
            w='100%'
          >
            <Flex>
            <Heading 
            w='100%'
        color={titleColor}
        fontWeight='bold'
        mt='10px'
        mb='26px'
        marginTop={3}>Registered Stickers  </Heading>
        <Button onClick={onOpen} colorScheme='teal' leftIcon={<AddIcon/>}>New Sticker</Button>
        </Flex>
            {/* <Flex
              width="100%"
              justify="center"
              direction="column"
              marginTop={5}
            > */}
{userStickers=='' ? 
(<Text>You do not have any stickers. Click<Link color={'blue'} onClick={onOpen}>   here </Link>to apply for a new sticker.</Text>
):(
              <TableContainer>
  <Table variant='striped' colorScheme='blackAlpha'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        {/* <Th>Sticker Number</Th> */}
        <Th>Vehicle Number</Th>
        <Th>date</Th>
        <Th>validity</Th>
        <Th>status</Th>
        {/* TODO: Change name later */}
      </Tr>
    </Thead>
    <Tbody>
      {
        userStickers.map((userStickers) => (
          <Tr key={userStickers.id} 
          // StickersId={userStickers.id}
          >
            {/* <Td>{userStickers.stickers_no}</Td> */}
            <Td>{userStickers.vehicle_id}</Td>
            <Td>{userStickers.date}</Td>
            <Td>{userStickers.validity}</Td>
            <Td>{userStickers.status}</Td>
            {/* <Td><Button colorScheme='teal' onClick={() => {
              onImgOpen()
            }}>Show</Button></Td>
            <Td><Button leftIcon={<DeleteIcon/>} onClick={() => {
              onVehicleDeleteOpen()
            }} colorScheme='red'>Delete</Button></Td> */}
          </Tr>
        ))
      }
      
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>Table
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>
</TableContainer>
)}
              {/* </Flex> */}
          {/* </Box> */}
          
        </Box>
      </Flex>
    </>
  )
}

export default Stickers

