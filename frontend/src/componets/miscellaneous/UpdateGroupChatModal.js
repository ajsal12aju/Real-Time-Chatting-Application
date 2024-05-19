import React, { useState } from "react";
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
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "./UserBadgeitem";
import axios from "axios";
import UserListItem from "../UserListItem";

function UpdateGroupChatModal({ setFetchAgain, fetchAgain }) {
  const { selectedChat, setSelectedChat, user } = ChatState();
console.log(selectedChat, "=====selectedChat====");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();




  const handleRemove = async (user1) => {
      
         if (
           selectedChat.groupAdmin._id !== user._id &&
           user1._id !== user._id
         ) {
           toast({
             title: "Only admins can remove someone!",
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "bottom",
           });
           return;
         }
try {
    

      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);


} catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to rename the group chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
}

   };

    //  const handleAddUser = async (user1) => {
       

    

    //    try {
    //      setLoading(true);
    //      const config = {
    //        headers: {
    //          Authorization: `Bearer ${user.token}`,
    //        },
    //      };
    //      const { data } = await axios.put(
    //        `/api/chat/groupadd`,
    //        {
    //          chatId: selectedChat._id,
    //          userId: user1._id,
    //        },
    //        config
    //      );

    //      setSelectedChat(data);
    //      setFetchAgain(!fetchAgain);
    //      setLoading(false);
    //    } catch (error) {
    //      toast({
    //        title: "Error Occured!",
    //        description: error.response.data.message,
    //        status: "error",
    //        duration: 5000,
    //        isClosable: true,
    //        position: "bottom",
    //      });
    //      setLoading(false);
    //    }
    //    setGroupChatName("");
    //  };

  const handleAddUser = async (user1) => {
 
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
       if (selectedChat.groupAdmin._id !== user._id) {
         toast({
           title: "Only admins can add someone!",
           status: "error",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         return;
       }


       try {
        setLoading(true)
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };

        const { data } = await axios.put(
          `/api/chat/groupadd`,
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
 setSelectedChat(data);
 setFetchAgain(!fetchAgain);
 setLoading(false);
         
       } catch (error) {
        toast({
          title: "Error Occurred",
          description: "Failed to rename the group chat.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
          setLoading(false);
       }
              setGroupChatName("");

    
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to rename the group chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the search results.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="work-sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" w="100%" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Update Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                backgroundColor="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input
                placeholder="Add User to Group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={2} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;
