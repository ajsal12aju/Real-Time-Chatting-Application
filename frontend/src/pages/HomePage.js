import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../componets/Authantication/Login';
import Signup from '../componets/Authantication/Signup';
import { useHistory } from 'react-router-dom';

function HomePage() {
const history = useHistory();

useEffect(() => {
const user = JSON.parse(localStorage.getItem("userInfo"))
if(user) history.push('/chats')
},[])

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={"3"}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="work sans" color="black">
          Welcome To Chatting App
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">   
                  <TabList mb="1em">
            <Tab width="50%">Login Page</Tab>
            <Tab width="50%">Sign Up Page</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
             <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
