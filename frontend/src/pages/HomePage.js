import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

function HomePage() {
  return (
   <Container maxW="xl" centerContent>
    <Box
    display="flex"
    justifyContent="center"
    p={"3"}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    >
    <Text fontSize="4xl" fontFamily="work sans" color="black">
      Sign Up
    </Text>
    </Box>
<Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">

</Box>
   </Container>
  )
}

export default HomePage
