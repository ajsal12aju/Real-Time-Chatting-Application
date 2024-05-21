import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './profileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';

function SingleChat({ fetchAgain, setFetchAgain }) {
      const { selectedChat, setSelectedChat, user } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState();
    const toast = useToast();


  const fetchMessages = async ()=> {
    if(!selectedChat) return

    try {
      const config = {
        headers: {
         
          Authorization: `Bearer ${user.token}`,
        },
      };

        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
        setMessages(data)
        setLoading(false);
    } catch (error) {
       toast({
         title: "Error Occurred",
         description: "Failed to load the search results.",
         status: "error",
         duration: 3000,
         isClosable: true,
         position: "top-left",
       });
    }
  } 

  useEffect(() => {
  fetchMessages();
  }, [selectedChat])

  const sendMessage = async (event) => {
     if(event.key === "Enter" && newMessage){
      try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
                        setNewMessage("");

            const { data } = await axios.post(
              "/api/message",
              {
                content: newMessage,
                chatId: selectedChat._id,
              },
              config
            );
            setMessages([...messages, data]);
      } catch (error) {
          toast({
            title: "Error Occurred",
            description: "Failed to load the search results.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-left",
          });
      }
     }
  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat?.chatName.toUpperCase()}

                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden"

          >
{loading ? (
<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
): (
<></>
)}
<FormControl onKeyDown={sendMessage} isRequired mt={3}> 
<Input variant="filled" placeholder='Enter a message' onChange={typingHandler}/>
</FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start a chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat
