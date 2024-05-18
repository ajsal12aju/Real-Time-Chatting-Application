import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from '../../Context/ChatProvider';
function GroupChatModal({children}) {
  const { user, chats, setChats } = ChatState();

    console.log(children, "===children==")
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [groupChatName, setGroupChatName] = useState()
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [search, setSearch] = useState("");
      const [searchResult, setSearchResult] = useState([]);
      const [loading, setLoading] = useState(false);

      const toast = useToast()
  return (
    <Box>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="35px"
          fontFamily="work sans"
          display="flex"
          justifyContent="center"
          >Create Group Chat sdf</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" >
          
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default GroupChatModal
