import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './profileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

function SingleChat({ fetchAgain, setFetchAgain }) {
      const { selectedChat, setSelectedChat, user } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState();
  
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
<Input variant="filled"  />
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
