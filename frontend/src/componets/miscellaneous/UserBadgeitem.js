import { Box } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";

function UserBadgeItem({ user, handleFunction }) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={1}
      variant="solid"
      fontSize={12}
      backgroundColor="Highlight"
      cursor="pointer"
      onClick={handleFunction}

      
    >
      {user.name}
      <CloseIcon ml={1}/>
    </Box>
  );
}

export default UserBadgeItem;
