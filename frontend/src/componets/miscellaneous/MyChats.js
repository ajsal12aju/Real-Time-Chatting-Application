import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from '../ChatLoading'

function MyChats() {
  const [loggedUser, setLoggedUser] = useState()
  const {selectedChat, setSelectedChat, user, chats , setChats} = ChatState()
     const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get("/api/chat", config);
      setChats(response.data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the chat data.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };


   useEffect(() => {
setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
fetchChats();
   },[])

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button display="flex" fontSize={{base: "17px", md:"10px", lg:"17px"}}>New Group Chat</Button>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
{chats ? (
  <Stack overflowY="scroll">
   {chats.map((chat)=>(
    <Box 
    onClick={() => setSelectedChat(chat)}
    cursor="pointer"
    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
    color={selectedChat === chat ? "white" : "black"}
    px={3}
    py={2}
    borderRadius="lg"
    key={chat._id}
    >

    </Box>
   ))}
  </Stack>
):(
  <ChatLoading/>
)}
      </Box>
    </Box>
  );
}

export default MyChats
