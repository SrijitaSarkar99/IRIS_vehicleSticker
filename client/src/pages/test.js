import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import OrdersOverview from './Dashboard/component/OrdersOverview'
import { timelineData } from '../variables/general'
function test() {
  return (
    
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
        
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
    
    </Flex>
  )
}

export default test
