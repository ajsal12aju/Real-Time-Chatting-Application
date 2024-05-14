import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'

function UserListItem({handleFunciton}) {

    const {user} = ChatState()

  return <Box onClick={handleFunciton} cursor="pointer" bg="#E8E8E8" _hover={{
    background:"#38B2AC",
    color:"white"
  }}
  w="100%" display="flex" alignItems="center" color="black" px={3} py={2} mb={2} borderRadius="lg" 
  ></Box>;
}

export default UserListItem
