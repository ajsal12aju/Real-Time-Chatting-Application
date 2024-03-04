import React, { useEffect } from 'react'
import axios from "axios"

function ChatPage() {

   const fetchChats = async () =>{
    const data = await axios.get("/api/chat");
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
