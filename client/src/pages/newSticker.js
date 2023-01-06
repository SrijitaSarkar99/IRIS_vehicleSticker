import React, { useState } from 'react'
import {
    Alert,
    AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  // Icon,
  Input,
  Link,
  MenuOptionGroup,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import AdminNav from "../components/AdminNav";
import axios from 'axios';

function NewSticker() {
    const [formData, setFormData] = useState({}); 
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("two_wheeler");
    const [vehicleModel, setVehicleModel] = useState("");
    const [rcHolderName, setRCHolderName] = useState("");
    const [relationship, setRelationship] = useState("default");
    const [othersRelationship, setOthersRelationship] = useState("");
    const [copyOfRC, setCopyOfRC] = useState();
    const [alertMessage, setAlertMessage] = useState("");

    const toast = useToast();

    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

    const handleRCUpload = (e) => {
        setCopyOfRC(e.target.files[0]);
      };
    
      const validateInput = () => {
        // https://stackoverflow.com/questions/6386300/want-a-regex-for-validating-indian-vehicle-number-format
        const vehicleNumberPattern =
          "^[A-Z]{2}[-][0-9]{1,2}[-](?:[A-Z])?(?:[A-Z]*)[-][0-9]{4}$";
    
        console.log(!vehicleNumber.match(vehicleNumberPattern));
    
        if (vehicleNumber === "") setAlertMessage("Vehicle Number is not filled.");
        else if (vehicleModel === "")
          setAlertMessage("Vehicle Model is not filled.");
        else if (rcHolderName === "")
          setAlertMessage("RC Holder Name is not filled.");
        else if (relationship === "default")
          setAlertMessage("Kindly select Relationship with RC Holder.");
        else if (relationship === "others" && othersRelationship == "")
          setAlertMessage("Relationship with RC Holder is not filled.");
        else if (copyOfRC === undefined) setAlertMessage("Kindly upload RC Copy.");
        else if (!vehicleNumber.match(vehicleNumberPattern))
          setAlertMessage("Invalid Vehicle Number Format.");
        else {
          setAlertMessage("");
          return true;
        }
        return false;
      };
    
      const handleSubmit =async () => {
        const isValid = validateInput();
       
      };
    
  return (
    <>
    <AdminNav/>
    <Flex width="100%" justify="center">
        <Box >
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
          )}
          <Box
            border="1px"
            borderColor="gray.200"
            padding={5}
            borderRadius={5}
            marginTop={5}
          >
            <Heading 
        color={titleColor}
        fontWeight='bold'
        mt='10px'
        mb='26px'
        marginTop={3}>Application for Vehicle Sticker</Heading>
            <Flex
              width="100%"
              justify="center"
              direction="column"
              marginTop={5}
            >
     <FormControl>
                <Box marginTop={3}>
                  <FormLabel>Vehicle Number</FormLabel>
                  <Input
                    borderRadius='10px'
                    type="email"
                    value={vehicleNumber}
                    placeholder="KA-11-AB-1234"
                    onChange={(e) => {
                      setVehicleNumber(e.target.value.toUpperCase());
                    }}
                  />
                </Box>
                <Box marginTop={3}>
                  <FormLabel>Vehicle Type</FormLabel>
                  <RadioGroup value={vehicleType} onChange={setVehicleType}>
                    <HStack spacing="48px">
                      <Radio value="two_wheeler">2 Wheeler</Radio>
                      <Radio value="four_wheeler">4 Wheeler</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                <Box marginTop={3}>
                  <FormLabel>Vehicle Model</FormLabel>
                  <Input
                  borderRadius='10px'
                    type="text"
                    value={vehicleModel}
                    placeholder="Ex: Honda Activa"
                    onChange={(e) => {
                      setVehicleModel(e.target.value);
                    }}
                  />
                </Box>
                <Box marginTop={3}>
                  <FormLabel>Registration Certificate Holder Name</FormLabel>
                  <Input
                  borderRadius='10px'
                    type="text"
                    value={rcHolderName}
                    placeholder="Enter Holder's Name Here"
                    onChange={(e) => {
                      setRCHolderName(e.target.value);
                    }}
                  />
                </Box>
                <Box marginTop={3}>
                  <FormLabel>Relationship with the RC Holder</FormLabel>
                  <Select
                  borderRadius='10px'
                    value={relationship}
                    onChange={(e) => {
                      setRelationship(e.target.value);
                    }}
                  >
                    <option value="default">Select Here</option>
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
                      value={othersRelationship}
                      onChange={(e) => {
                        setOthersRelationship(e.target.value);
                      }}
                    />
                  </Box>
                )}
                <Box marginTop={3}>
                  <FormLabel>Upload Copy of Registration Certificate</FormLabel>
                  <Input borderRadius='10px' pt={1} type="file" onChange={handleRCUpload} />
                </Box>
                <Box marginTop={3}>
                  <Flex justify="space-evenly">
                    <Button 
                    colorScheme="teal" 
                    onClick={handleSubmit}>
                      Submit Application
                    </Button>
                  </Flex>
                </Box>
              </FormControl>
              </Flex>
          </Box>
          
        </Box>
      </Flex>
    </>
  )
}

export default NewSticker
