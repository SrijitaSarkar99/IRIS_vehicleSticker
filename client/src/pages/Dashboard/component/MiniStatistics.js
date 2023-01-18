// Chakra imports
import {
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "../../../components/Card/Card.js";
  import CardBody from "../../../components/Card/CardBody.js";
  // import IconBox from "components/Icons/IconBox";
  import React from "react";
  
  const MiniStatistics = ({ title, amount, /*percentage, icon */}) => {
    // const iconTeal = useColorModeValue("teal.300", "teal.300");
    // const textColor = useColorModeValue("gray.700", "white");
    const textColor = useColorModeValue("teal.300", "teal.300");
    return (
      <Card minH='83px' bg={useColorModeValue("gray.100","teal.100")}  border='1px' borderColor='teal.200' rounded='md' variant='filled'>
        <CardBody >
          <Flex flexDirection='row' align='center' justify='center' w='100%'  >
            <Stat me='auto' p={'5'}>
              <StatLabel
                fontSize='sm'
                color='gray.400'
                fontWeight='bold'
                pb='.1rem'>
                {title}
              </StatLabel>
              <Flex>
                <StatNumber fontSize='lg' color={textColor}>
                  {amount}
                </StatNumber>
              </Flex>
            </Stat>
            {/* <IconBox as='box' h={"45px"} w={"45px"} bg={iconTeal}>
              {icon}
            </IconBox> */}
          </Flex>
        </CardBody>
      </Card>
    );
  };
  
  export default MiniStatistics;