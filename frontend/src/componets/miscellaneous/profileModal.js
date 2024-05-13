import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Text } from '@chakra-ui/react';
import {useDisclosure} from "@chakra-ui/hooks"
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useHistory } from 'react-router';


function ProfileModal({user, children}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="350px">
          <ModalHeader
            fontSize="30px"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" flexDirection="column" justifyContent="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            ></Image>
            <Text
              fontFamily="work sans"
              fontSize={{ base: "15px", md: "20px" }}
            >
              Email : {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
