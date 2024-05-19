import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../Context/ChatProvider';

function SingleChat({ fetchAgain, setFetchAgain }) {
      const { selectedChat, setSelectedChat, user } = ChatState();

  return <>
 {
    selectedChat ? (
        <>
        
        </>
    ): (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                Click on a user to start a chatting
            </Text>
        </Box>
    )
 }
  </>;
}

export default SingleChat
