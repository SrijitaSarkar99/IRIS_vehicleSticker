import { Box, Card, Flex, Grid, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react'
import AdminNav from "../../components/AdminNav"
import { timelineData } from '../../variables/general';
import OrdersOverview  from './component/OrdersOverview';
import MiniStatistics from './component/MiniStatistics';


function Dashboard() {
  return (
    <Flex
    direction='column'
    alignSelf='center'
    justifySelf='center' 
    overflow='hidden'>
    <Flex
    direction='column'
    justifySelf='center' 
    overflow='hidden'>
      <AdminNav/>
    </Flex>
      {/* <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
    <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
      <OrdersOverview
          title={"Orders Overview"}
          amount={30}
          data={timelineData}
        />
    </Grid>
    </Flex> */}
     <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }} 
     justifySelf='center' 
    overflow='hidden'
    p={40}
    
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
    <MiniStatistics 
    title={"Your Stickers"}
    amount={"0"}
    // icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />

<MiniStatistics 
    title={"Your Vehicles"}
    amount={"0"}
    // icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />

        </SimpleGrid>

        <Grid>
          
        </Grid>
        </Flex>


</Flex>
  )
}

export default Dashboard
