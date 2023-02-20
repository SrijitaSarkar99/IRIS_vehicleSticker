import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
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
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, WarningIcon, EditIcon, DeleteIcon, InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import AdminNav from "../components/AdminNav";
import AuthApi from "../api/auth";

function Vehicles() {
  const [formData, setFormData] = useState({});
  const [RCImage, setRCImage] = useState();
  const [RCImageLoc, setRCImageLoc] = useState(undefined);
  const [relationship, setRelationship] = useState("default");
  const [userVehicles, setUserVehicles] = useState([]);

  const toast = useToast();

  /*For Add New Vehicle Modal Popup Button*/
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  /***************************************/

  /*For Image Modal Popup Button*/
  const { isOpen: isImgOpen, onOpen: onImgOpen, onClose: onImgClose } = useDisclosure()
  /***************************************/

  /*For Deleting a Vehicle */
  const { isOpen: isVehicleDeleteOpen, onOpen: onVehicleDeleteOpen, onClose: onVehicleDeleteClose } = useDisclosure()
  const cancelRef = React.useRef()
  /***************************************/

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: (e.target.name === "RCCopy") ? e.target.files[0] : e.target.value
    })
  }


  const handleSubmit = async (e) => {
    // const isValid = validateInput();
    e.preventDefault();
 // https://stackoverflow.com/questions/6386300/want-a-regex-for-validating-indian-vehicle-number-format
     const vehicleNumberPattern =
   "^[A-Z]{2}[-][0-9]{1,2}[-](?:[A-Z])?(?:[A-Z]*)[-][0-9]{4}$";

     //check if all fields are filled
     if (invalidInput(formData)) {
      return toast({
        title: "Error Occured",
        description: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    //check if name is valid
    if (!/^[a-zA-Z]+$/.test(formData.RCHName)) {
      return toast({
        title: "Error!",
        description: "Please enter a valid Name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    if(!(formData.RCCopy)==undefined) {
      return toast({
        title: "Error!",
        description: "Please upload Registration Certificate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    if (!(formData.VehicleNo).match(vehicleNumberPattern))
    {
      return toast({
        title: "Error!",
        description: "Please enter a valid Vehicle Number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
     

    const data = new FormData();
    for (const property in formData) {
      data.append(property, formData[property]);
    }

    AuthApi.ADDVEHICLE(data, currentUser)
    .then((response) => {
      
      // console.log(response.data);
      setUserVehicles([response.data,...userVehicles]);
      toast({
        title: 'New vehicle added.',
        description: "Your Vehicle added successfully to the database",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    })
    .catch((error) => {
      if (error.response) {
        console.log(error)
      toast({
        title: "Error!",
        description: "Vehicle already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      }
    });
  };

  const getFile = async (e) => {
    setRCImageLoc(undefined)
    try {
      const response = await fetch(e, {
        method: "GET",
        headers: {  Authorization: `Bearer ${currentUser.token}`,
        responseType: "blob"
      },
      })

      const data = await response.blob();
      setRCImage(data);
      setRCImageLoc(URL.createObjectURL(data))
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AuthApi.GETUSERVEHICLE(currentUser)
    .then((response) => {
      // console.log(response.data);
      setUserVehicles(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error);
      }
    });
  }, []);
  return (
    <>
      <AdminNav />

      {/* <Button onClick={onOpen} colorScheme='teal'>< AddIcon />Add Vehicle</Button> */}
      <Modal
        size='xl'
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new vehicle</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Box marginTop={3}>
                <FormLabel>Vehicle Number </FormLabel>
                <Input
                  borderRadius='10px'
                  type="email"
                  name='VehicleNo'
                  placeholder="KA-11-AB-1234"
                  onChange={handleChange}
                  
                />
              </Box>
              <Box marginTop={3}>
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


              </Box>
              <Box marginTop={3}>
                <FormLabel>Vehicle Model</FormLabel>
                <Input
                  borderRadius='10px'
                  type="text"
                  name='model'
                  placeholder="Ex: Honda Activa"
                  onChange={handleChange}
                />
              </Box>
              <Box marginTop={3}>
                <FormLabel>Registration Certificate Holder Name</FormLabel>
                <Input
                  borderRadius='10px'
                  type="text"
                  name='RCHName'
                  placeholder="Enter Holder's Name Here"
                  onChange={handleChange}
                />
              </Box>
              <Box marginTop={3}>
                <FormLabel>Relationship with the RC Holder</FormLabel>
                <Select
                  borderRadius='10px'
                  placeholder='Select Here'
                  name='relation'
                  onChange={handleChange}
                >
                  {/* <option value="default">Select Here</option> */}
                  <option value="self">Self</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="others">Others (please specify)</option>
                </Select>
              </Box>
              {relationship === "others" && (
                <Box marginTop={3}>
                  <FormLabel>Others</FormLabel>
                  <Input
                    borderRadius='10px'
                    type="text"
                    name='relation'
                    onChange={handleChange}
                  />
                </Box>
              )}
              <Box marginTop={3}>
                <FormLabel>Upload Registration Certificate</FormLabel>
                <Input borderRadius='10px' pt={1} type="file"
                  name='RCCopy'
                  onChange={handleChange}
                />
              </Box>
            </FormControl>


          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSubmit}>
              Add Vehicle
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
            {RCImageLoc && <Image src={RCImageLoc} />}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onImgClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*****************************************************/}

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
              <Button
                colorScheme='red'
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
              marginTop={3}>Registered Vehicle  </Heading>
            <Button onClick={onOpen} colorScheme='teal' leftIcon={<AddIcon />}>New Vehicle</Button>
          </Flex>
{userVehicles=='' ? 
(<Text>You do not have any vehicles registered. Click <Link color={'blue'} onClick={onOpen}>here</Link> to add new vehicle.</Text>
):(
          <TableContainer>
            <Table variant='striped' colorScheme='blackAlpha'>
              <Thead>
                <Tr>
                  <Th>Vehicle Number</Th>
                  <Th>Type</Th>
                  <Th>Model</Th>
                  <Th>RC Holder Name</Th>
                  <Th>Relationship with RC Holder</Th>
                  <Th>RC Copy</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  userVehicles.map((userVehicle) => (
                    <Tr key={userVehicle.id} 
                    // vehicleId={userVehicle.id}
                    >
                      <Td>{userVehicle.vehicle_no}</Td>
                      <Td>{userVehicle.vehicle_type}</Td>
                      <Td>{userVehicle.model}</Td>
                      <Td>{userVehicle.rch_name}</Td>
                      <Td>{userVehicle.relation}</Td>
                      {/* {console.log(userVehicle.rc_copy)} */}
                      <Td><Button colorScheme='teal' onClick={async () => {
                        await getFile(userVehicle.rc_copy);
                        onImgOpen();
                      }}>Show</Button></Td>
                      {/* <Td><Button leftIcon={<DeleteIcon />} onClick={() => {
                        onVehicleDeleteOpen()
                      }} colorScheme='red' variant={'outline'}>Delete</Button></Td> */}
                      {/* <Td><Button leftIcon={<EditIcon/>} colorScheme='teal' variant='outline'>Edit</Button></Td> */}
                    </Tr>
                  ))
                }

              </Tbody>
            </Table>
          </TableContainer>

)}
        </Box>
      </Flex>
    </>
  )
}

export default Vehicles


function invalidInput(formData) {
  return (
    !formData.VehicleNo ||
    !formData.VehicleType ||
    !formData.model ||
    !formData.RCHName ||
    !formData.relation ||
    !formData.RCCopy
  );
}