import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, chakra, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import  {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./profileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserListItem";


function SideDrawer() {

  const history = useHistory();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  console.log(searchResult, "===search====");

  const { user, setSelectedChat, chats, setChats } = ChatState();
  console.log(chats, "+++chats+++");
  const { isOpen, onOpen, onClose } = useDisclosure();

     const logoutHandler = () => {
       localStorage.removeItem("userInfo");
      history.push("/");
     };

     const toast = useToast();

     const handleSearch = async () =>{
   if(!search){
      toast({
        title: "Please Type anything in the search.",
        description: "We've created your account for you.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return
   }
   try {
    setLoading(true)

    const config = {
      headers: {
        Authorization : `Bearer ${user.token}`
      }
    }

    const {data} = await axios.get(`/api/user?search=${search}`, config)
    setLoading(false)
    setSearchResult(data)
   } catch (error) {
     toast({
       title: "Error Occured",
       description: "Faild to Load the Search result.",
       status: "error",
       duration: 3000,
       isClosable: true,
       position: "top-left",
     });
   }
     }
const accessChat = async (userId) => {
  console.log(userId, "====userId====");
try {
  setLoadingChat(true);

  const config = {
    headers: {
      "Content-type" :"application/json",
      Authorization: `Bearer ${user.token}`

    },
  };
  const {data} = await axios.post("/api/chat", {userId}, config)
console.log("++data+++", data);
console.log(!chats, "===!chats===");
  if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
setSelectedChat(data)
  setLoadingChat(false);
  onClose();
} catch (error) {
     toast({  
       title: "Error Occured",
       description: error.message,
       status: "error",
       duration: 3000,
       isClosable: true,
       position: "top-left",
     });
       setLoadingChat(false);

}
}
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="gohst" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or mail"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {
              loadingChat && <Spinner ml="auto" display="flex"/>           }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
