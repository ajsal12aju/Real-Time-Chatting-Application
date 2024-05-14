import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

function MyChats() {
  const [loggedUser, setLoggedUser] = useState()
  const {selectedChat, setSelectedChat, user, chats , setChats} = ChatState()
     const toast = useToast();

  const fetchChats = async () =>{
    try {
      
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const {data} =  axios.get("/api/chat", config)
    setChats(data)
     } catch (error) {
       toast({
         title: "Error Occured",
         description: "Faild to Load the Search result.",
         status: "error",
         duration: 3000,
         isClosable: true,
         position: "top-left",
       });
    }
  }

  return (
    <div style={{color:'white'}}>
      MyChats
    </div>
  )
}

export default MyChats
