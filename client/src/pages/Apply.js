import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function Apply() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("two_wheeler");
  const [vehicleModel, setVehicleModel] = useState("");
  const [rcHolderName, setRCHolderName] = useState("");
  const [relationship, setRelationship] = useState("default");
  const [othersRelationship, setOthersRelationship] = useState("");
  const [copyOfRC, setCopyOfRC] = useState();
  const [alertMessage, setAlertMessage] = useState("");

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

  const handleSubmit = () => {
    const isValid = validateInput();
  };

  return (
    <>
      <Flex width="100%" justify="center">
        <Box>
          <Box
            border="1px"
            borderColor="gray.200"
            padding={5}
            borderRadius={5}
            marginTop={5}
          >
            <Heading marginTop={3}>Application for Vehicle Sticker</Heading>
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
                  <Input type="file" onChange={handleRCUpload} />
                </Box>
                <Box marginTop={3}>
                  <Flex justify="space-evenly">
                    <Button colorScheme="blue" onClick={handleSubmit}>
                      Submit Application
                    </Button>
                  </Flex>
                </Box>
              </FormControl>
            </Flex>
          </Box>
          {alertMessage && (
            <Box marginTop={5}>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Incorrect Details</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default Apply;
