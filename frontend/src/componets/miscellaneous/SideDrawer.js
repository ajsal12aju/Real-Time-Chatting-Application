import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import  {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState("");

  const {user} = ChatState()

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
          <Button variant="gohst">
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat App datas
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
              <Avatar size="sm" cursor="pointer" name={user.name}></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
