import React, { useEffect, useState } from 'react'
import axios from "axios"

function ChatPage() {

cosnt [chats, setChats] = useState([])

   const fetchChats = async () =>{
    const data = await axios.get("/api/chat");
    setChats(data)
    console.log(data);
   }

 useEffect(()=>{
 fetchChats()
 }, [])
    
  return (
    <div>
      welcome to chat page he  done
    </div>
  )
}

export default ChatPage
