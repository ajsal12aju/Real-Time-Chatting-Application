import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

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
    <div style={{color:'white'}}>
      MyChats
    </div>
  )
}

export default MyChats
