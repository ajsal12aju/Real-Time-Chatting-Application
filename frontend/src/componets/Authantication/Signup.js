import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();

  return (
    <VStack>
      <FormControl>
        <FormLabel></FormLabel>
        <Input placeholder='Enter Your name' />
      </FormControl>
    </VStack>
  );
}

export default Signup;
