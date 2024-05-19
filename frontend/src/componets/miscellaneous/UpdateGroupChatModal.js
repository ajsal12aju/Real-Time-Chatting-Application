import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';

function UpdateGroupChatModal() {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [groupChatName, setGroupChatName] = useState();
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const [search, setSearch] = useState("");
        const [renameLoading, setRenameLoading] = useState("");
        
  const toast = useToast();

      const { selectedChat, setSelectedChat, user } = ChatState();
      


  return (
    <>
 <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            dsfd
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </> 
  )
}

export default UpdateGroupChatModal
