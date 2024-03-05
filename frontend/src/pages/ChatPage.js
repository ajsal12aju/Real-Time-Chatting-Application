import React, { useEffect, useState } from 'react'
import axios from "axios"

function ChatPage() {

const [chats, setChats] = useState([]);

const fetchChats = async () => {
  const response = await axios.get("/api/chat");
  setChats(response.data); 
  console.log(response.data); 
};


 useEffect(()=>{
 fetchChats()
 }, [])
    
  return (
    <div>
        {chats.map((chat)=>(
            <div key={chat._id}>{chat.chatName}</div>
        ))}
      welcome to chat page he done
    </div>
  )
}

export default ChatPage
