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
import { AddIcon, WarningIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import AdminNav from "../components/AdminNav";
import axios from 'axios';

function Vehicles() {
  const [formData, setFormData] = useState({});
  const [RCImage, setRCImage] = useState();
  const [RCImageLoc, setRCImageLoc] = useState(undefined);
  const [relationship, setRelationship] = useState("default");
  const [userVehicles, setUserVehicles] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

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

  //TODO: Data Validation
  // const validateInput = () => {
  //   // https://stackoverflow.com/questions/6386300/want-a-regex-for-validating-indian-vehicle-number-format
  //   const vehicleNumberPattern =
  //     "^[A-Z]{2}[-][0-9]{1,2}[-](?:[A-Z])?(?:[A-Z]*)[-][0-9]{4}$";

  //   console.log(!vehicleNumber.match(vehicleNumberPattern));

  //   if (vehicleNumber === "") setAlertMessage("Vehicle Number is not filled.");
  //   else if (vehicleModel === "")
  //     setAlertMessage("Vehicle Model is not filled.");
  //   else if (rcHolderName === "")
  //     setAlertMessage("RC Holder Name is not filled.");
  //   else if (relationship === "default")
  //     setAlertMessage("Kindly select Relationship with RC Holder.");
  //   else if (relationship === "others" && othersRelationship == "")
  //     setAlertMessage("Relationship with RC Holder is not filled.");
  //   else if (copyOfRC === undefined) setAlertMessage("Kindly upload RC Copy.");
  //   else if (!vehicleNumber.match(vehicleNumberPattern))
  //     setAlertMessage("Invalid Vehicle Number Format.");
  //   else {
  //     setAlertMessage("");
  //     return true;
  //   }
  //   return false;
  // };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: (e.target.name === "RCCopy") ? e.target.files[0] : e.target.value
    })
  }


  const handleSubmit = async (e) => {
    // const isValid = validateInput();
    e.preventDefault();
    // console.log({ formData });
    const data = new FormData();
    for (const property in formData) {
      data.append(property, formData[property]);
    }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/vehicles`,
        data: data,

        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${currentUser.token}` },
      });

      setUserVehicles([...userVehicles,response.data]);

      toast({
        title: 'New vehicle added.',
        description: "Your Vehicle added successfully to the database",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();

    } catch (error) {
      console.log(error)
    }

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
    async function fetchData() {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/vehicles?user_id=${currentUser.userId}&limit=${5}&page=${1}`,
          headers: {  Authorization: `Bearer ${currentUser.token}` },
        });
        // console.log(response.data);
        setUserVehicles(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData();
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
                <FormLabel>Vehicle Number</FormLabel>
                <Input
                  borderRadius='10px'
                  type="email"
                  // value={vehicleNumber}
                  name='VehicleNo'
                  placeholder="KA-11-AB-1234"
                  // onChange={(e) => {
                  //   setVehicleNumber(e.target.value.toUpperCase());
                  // }}
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

                {/* <RadioGroup 
                  // value={vehicleType} 
                  name='VehicleType'
                  // onChange={setVehicleType}
                  onChange={handleChange}
                  >
                    <HStack spacing="48px">
                      <Radio value="two_wheeler">2 Wheeler</Radio>
                      <Radio value="four_wheeler">4 Wheeler</Radio>
                    </HStack>
                  </RadioGroup> */}

              </Box>
              <Box marginTop={3}>
                <FormLabel>Vehicle Model</FormLabel>
                <Input
                  borderRadius='10px'
                  type="text"
                  // value={vehicleModel}
                  name='model'
                  placeholder="Ex: Honda Activa"
                  // onChange={(e) => {
                  //   setVehicleModel(e.target.value);
                  // }}
                  onChange={handleChange}
                />
              </Box>
              <Box marginTop={3}>
                <FormLabel>Registration Certificate Holder Name</FormLabel>
                <Input
                  borderRadius='10px'
                  type="text"
                  // value={rcHolderName}
                  name='RCHName'
                  placeholder="Enter Holder's Name Here"
                  // onChange={(e) => {
                  //   setRCHolderName(e.target.value);
                  // }}
                  onChange={handleChange}
                />
              </Box>
              <Box marginTop={3}>
                <FormLabel>Relationship with the RC Holder</FormLabel>
                <Select
                  borderRadius='10px'
                  // value={relationship}
                  placeholder='Select Here'
                  name='relation'
                  // onChange={(e) => {
                  //   setRelationship(e.target.value);
                  // }}
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
                    // value={othersRelationship}
                    // onChange={(e) => {
                    //   setOthersRelationship(e.target.value);
                    // }}
                    onChange={handleChange}
                  />
                </Box>
              )}
              <Box marginTop={3}>
                <FormLabel>Upload Copy of Registration Certificate</FormLabel>
                <Input borderRadius='10px' pt={1} type="file"
                  name='RCCopy'
                  // onChange={handleRCUpload} 
                  onChange={handleChange}
                />
              </Box>
              {/* <Box marginTop={3}>
                  <Flex justify="space-evenly">
                    <Button 
                    colorScheme="teal" 
                    onClick={handleSubmit}>
                      Submit Application
                    </Button>
                  </Flex>
                </Box> */}
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
            {console.log(RCImageLoc)}
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
              marginTop={3}>Registered Vehicle  </Heading>
            <Button onClick={onOpen} colorScheme='teal' leftIcon={<AddIcon />}>New Vehicle</Button>
          </Flex>
          {/* <Flex
              width="100%"
              justify="center"
              direction="column"
              marginTop={5}
            > */}

          <TableContainer>
            <Table variant='striped' colorScheme='blackAlpha'>
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Vehicle Number</Th>
                  <Th>Type</Th>
                  <Th>Model</Th>
                  <Th>RC Holder Name</Th>
                  <Th>Relationship with RC Holder</Th>
                  {/* TODO: Change name later */}
                  <Th>RC Copy</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  userVehicles.map((userVehicle) => (
                    <Tr key={userVehicle.id} vehicleId={userVehicle.id}>
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
              {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>Table
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
            </Table>
          </TableContainer>

          {/* </Flex> */}
          {/* </Box> */}

        </Box>
      </Flex>
    </>
  )
}

export default Vehicles
