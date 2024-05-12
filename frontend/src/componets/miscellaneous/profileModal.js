import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react'

function profileModal({user, children}) {
    
      const { isOpen, onOpen, onClose } = useDisclosure();


  return <>{children ? (
    <span>{children}</span>
  ):(
    <IconButton d={{base="flec"}} icon={<ViewIcon/>} onclick={onOpen}></IconButton>
  )}</>;
}

export default profileModal
